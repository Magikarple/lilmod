#!/usr/bin/env python3
"""
View or modify Free Cities save files in native format or JSON format.

Run this program with --help to see a summary of its options.
Try also --long-help to see more details and some examples.

This software is released into the public domain (CC0).
"""

# Written in 2020 by UnwrappedGodiva <UnwrappedGodiva+FC@gmail.com>
# Thanks to  2024 bicobus <bicobus@keemail.me>
#
# To the extent possible under law, the author(s) have dedicated all copyright
# and related and neighboring rights to this software to the public domain
# worldwide.  This software is distributed without any warranty.  You should
# have received a copy of the CC0 Public Domain Dedication along with this
# software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
#
# In other words, feel free to do whatever you want with this code: modify it,
# borrow any part of it in your own code, rewrite it in a different language,
# remove this note and put your name on it, sell it for indecent amounts of
# money, or redistribute it under any software license.  But there is no
# warranty.  If it creates a giant black hole that destroys the known universe,
# do not blame me for it.

# Sanity checks that should be performed on this code on a regular basis:
#   pylint3 ./fc_edit_save.py
#   yapf3 --style=Google -d ./fc_edit_save.py
# See also: http://google.github.io/styleguide/pyguide.html
# pylint: disable=too-many-lines,too-many-statements,too-many-branches

__version__ = "0.3.1"

import argparse
import copy
import fnmatch
import inspect
import random
import json
import operator
import os
import re
import shutil
import sys
import textwrap
# If you do not have the lzstring module yet, you can install it with:
# pip3 install lzstring   (format used by Twine/SugarCube save files)
import lzstring


def version_check():
    """If this code compiles successfully, then the version is good enough."""
    if sys.version_info[0] < 3:
        print(
            "Python 2 is no longer maintained.  Please download a modern "
            "version of python at https://www.python.org/downloads/"
        )
        return False
    if sys.version_info[0] == 3 and sys.version_info[1] < 6:
        version = ".".join(map(str, sys.version_info))
        print("This software require python 3.6 or later.  You have {}".format(version))
        return False
    return True


# Escape early
if not version_check():
    sys.exit(1)


# The following fields exist only in the PC and can be ignored in slaves.
# This list was generated from a diff between the PC and a slave around version
# 1065 and will have to be adjusted as new features are added to the game.
IGNORE_IN_SLAVES = [
    "ballsImplant", "counter.birthArcOwner", "counter.birthCitizen",
    "counter.birthClient", "counter.birthDegenerate", "counter.birthElite",
    "counter.birthFutaSis", "counter.birthLab", "counter.birthMaster",
    "counter.birthOther", "counter.birthSelf", "counter.storedCum",
    "criticalDamage", "degeneracy", "fertDrugs", "forcedFertDrugs", "newVag",
    "origEye", "physicalImpairment", "pregMood", "refreshment",
    "refreshmentType", "relationships", "reservedChildren",
    "reservedChildrenNursery", "rumor", "sexualEnergy", "skill.cumTap",
    "skill.engineering", "skill.hacking", "skill.medicine", "skill.slaving",
    "skill.trading", "skill.warfare", "staminaPills", "title"
]

# The following fields exist only in slaves and can be ignored in the PC.
# This list was generated from a diff between the PC and a slave, with a few
# additions for things that might break if they are modified.  Although allowed,
# it is probably not a good idea to change PC.career and some other fields.
IGNORE_IN_PC = [
    "HGExclude", "NCSyouthening", "albinismOverride", "assignment", "attrKnown",
    "canRecruit", "choosesOwnAssignment", "choosesOwnChastity",
    "choosesOwnClothes", "clitSetting", "counter.PCChildrenFathered",
    "counter.PCKnockedUp", "counter.births", "counter.pitKills",
    "counter.publicUse", "currentRules", "custom.desc", "custom.hairVector",
    "custom.image", "custom.label", "custom.title", "custom.titleLisp", "death",
    "devotion", "dietCum", "dietMilk", "effectiveWhoreClass", "fetishKnown",
    "fuckdoll", "haircuts", "indenture", "indentureRestrictions",
    "lastWeeksCashIncome", "lastWeeksRepExpenses", "lastWeeksRepIncome",
    "lifetimeCashExpenses", "lifetimeCashIncome", "lifetimeRepExpenses",
    "lifetimeRepIncome", "newGamePlus", "oldDevotion", "oldTrust", "onDiet",
    "origin", "override_Arm_H_Color", "override_Brow_H_Color",
    "override_Eye_Color", "override_H_Color", "override_Pubic_H_Color",
    "override_Race", "override_Skin", "porn", "pregControl", "readyProsthetics",
    "recruiter", "relation", "relationTarget", "relationship",
    "relationshipTarget", "rivalry", "rivalryTarget", "rudeTitle", "sentence",
    "sexAmount", "sexQuality", "skill.DJ", "skill.anal", "skill.attendant",
    "skill.bodyguard", "skill.combat", "skill.entertainer",
    "skill.entertainment", "skill.farmer", "skill.headGirl", "skill.madam",
    "skill.matron", "skill.milkmaid", "skill.nurse", "skill.oral",
    "skill.penetrative", "skill.recruiter", "skill.servant", "skill.stewardess",
    "skill.teacher", "skill.vaginal", "skill.wardeness", "skill.whore",
    "skill.whoring", "slaveCost", "subTarget", "toyHole", "training", "trust",
    "useRulesAssistant", "weekAcquired", "whoreClass"
]

# Aliases for field names used in --get-slaves.
FIELD_ALIASES = {
    "name": ["birthName", "birthSurname", "slaveName", "slaveSurname"],
    "names": ["birthName", "birthSurname", "slaveName", "slaveSurname"],
    "parent": ["mother", "father"],
    "parents": ["mother", "father"]
}

# Each action can be a list of assignments or other actions that will be
# expanded recursively.  The documentation of modify_slave() and parse_value()
# explains how the assignments work and how special values are parsed:
# "A~B" for a random range, "A|B" for a choice, "atleast:", "atmost:", etc.
#
# Improvements to consider:
# - Change the names of the actions to match the values or ranges described in
#   the slave variables documentation or the conditions in src/js/assayJS.js.
# - add/remove piercings, tattoos, brand, ...
# - add or modify rules for the RA (Here be dragons)
SLAVE_ACTIONS = {
    # special roles for the slaves
    "Attendant": [
        "blind", "fetish=submissive", "mature", "genius", "femaleorgans",
        "career=a masseuse|a yoga instructor", "skill.attendant=atleast:200",
        "clothes=a kimono"
    ],
    "Agent": [
        "mature", "nympho", "fetish=dom", "genius", "career=an arcology owner",
        "clothes=nice business attire"
    ],
    "Bodyguard": [
        "goodshape", "muscles=96", "verytall", "skill.combat=1",
        "career=a bodyguard|a boxer|a soldier", "skill.bodyguard=atleast:200",
        "clothes=a military uniform|a mounty outfit|a police uniform"
    ],
    "Concubine": [
        "prestige=atleast:3", "experienced", "master", "beautiful", "devoted",
        "genius", "clothes=a ball gown|a succubus outfit|clubslut netting"
    ],
    "DJ": [
        "wife", "blind", "master", "goodshape", "beautiful", "genius",
        "career=a house DJ|a musician", "skill.DJ=atleast:200",
        "clothes=a t-shirt and panties|a t-shirt and thong"
    ],
    "Farmer": [
        "wife", "goodshape", "master", "experienced", "behavioralQuirk=funny",
        "sexualQuirk=caring", "maleorgans", "career=a farmer|a rancher",
        "skill.farmer=atleast:200", "clothes=Western clothing"
    ],
    "HeadGirl": [
        "rules.living=luxurious", "fetish=dom", "maleorgans", "femaleorgans",
        "master", "genius", "career=a captain|a director|a Queen",
        "skill.headGirl=atleast:200", "clothes=a ball gown"
    ],
    "Head Girl": ["HeadGirl"],
    "Headgirl": ["HeadGirl"],
    "HG": ["HeadGirl"],
    "Recruiter": [
        "devoted", "genius", "master", "healthy", "beautiful", "experienced",
        "rules.living=luxurious", "career=a princess|a spy|a talent scout",
        "skill.recruiter=atleast:200", "clothes=a fallen nuns habit"
    ],
    "Madam": [
        "wife", "master", "genius", "mature", "maleorgans",
        "career=a banker|a madam|a pimp", "skill.madam=atleast:200",
        "clothes=leather pants and pasties"
    ],
    "Matron": [
        "sexualQuirk=caring", "fetish=dom", "mature", "genius",
        "career=a babysitter|a nanny|a practitioner",
        "skill.matron=atleast:200", "clothes=a slutty maid outfit|an apron"
    ],
    "Milkmaid": [
        "goodshape", "master", "sexualQuirk=caring", "behavioralQuirk=funny",
        "maleorgans", "career=a milkmaid|a shepherd",
        "skill.milkmaid=atleast:200", "clothes=Western clothing"
    ],
    "MilkMaid": ["Milkmaid"],
    "Milk Maid": ["Milkmaid"],
    "Nurse": [
        "wife", "fetish=dom", "goodshape", "genius", "beautiful",
        "career=a doctor|a medic|a nurse|a surgeon", "skill.nurse=atleast:200",
        "clothes=a slutty nurse outfit"
    ],
    "Teacher": [
        "mature", "genius", "beautiful", "career=a coach|a professor|a teacher",
        "skill.teacher=atleast:200", "clothes=a schoolgirl outfit"
    ],
    "Schoolteacher": ["Teacher"],
    "Stewardess": [
        "healthy", "mature", "genius", "nympho", "fetish=dom",
        "career=a housekeeper|a housesitter", "skill.stewardess=atleast:200",
        "clothes=a slutty maid outfit"
    ],
    "Wardeness": [
        "wife", "nympho", "fetish=sadist", "maleorgans", "goodshape", "devoted",
        "career=a police officer|a prison guard", "skill.wardeness=atleast:200",
        "clothes=a red army uniform|a schutzstaffel uniform"
    ],
    "Lurcher": ["maleorgans", "devoted", "goodshape"],
    # fun combos
    "perfect": [
        "healthy", "genius", "devoted", "goodshape", "tall", "master",
        "behaves", "young"
    ],
    "boobdoll": ["healthy", "goodshape", "hugeboobs"],
    "slut": ["healthy", "goodshape", "tall", "bigboobs", "nympho"],
    "amazon": ["healthy", "goodshape", "verytall", "muscular", "bigboobs"],
    "bimbo": [
        "healthy", "beautiful", "fakeboobs", "fakebutt", "lips=80", "dumb",
        "clothes=a bimbo outfit"
    ],
    "cow": ["hugeboobs", "lactating", "counter.milk=atleast:2000~10000"],
    "slug": ["nolegs", "vagina=atleast:4", "vaginaLube=atleast:2"],
    "futa": ["maleorgans", "femaleorgans", "boobs=atleast:500"],
    "sissy": ["dick=1", "balls=1", "scrotum=1", "trust=-50"],
    "wellspring": [
        "young", "healthy", "vagina=3", "anus=3", "ovaries=1", "dick=5",
        "balls=5", "prostate=1", "lactating", "hugeboobs"
    ],
    "onahole": ["femaleorgans", "fetish=mindbroken", "mute", "deaf", "nolimbs"],
    # health
    "healthy": [
        "health.condition=atleast:100", "health.health=atleast:100",
        "health.illness=0", "health.longDamage=0", "health.shortDamage=0",
        "health.tired=0", "minorInjury=0", "eye.left.type=1",
        "eye.left.vision=2", "eye.right.type=1", "eye.right.vision=2",
        "eyewear=none", "hears=0", "earImplant=0", "earwear=none", "smells=0",
        "tastes=0", "heels=0", "voice=2", "voiceImplant=0", "electrolarynx=0",
        "teeth=normal", "vaginaLube=1", "preg=atleast:-1", "chem=0", "addict=0",
        "burst=0", "hasarms", "haslegs"
    ],
    "blind": [
        "eye.left.type=1", "eye.left.vision=0", "eye.right.type=1",
        "eye.right.vision=0", "eyewear=none"
    ],
    "mute": ["voice=0"],
    "deaf": ["hears=0"],
    "hasarms": ["arm.left.type=1", "arm.right.type=1"],
    "haslegs": ["leg.left.type=1", "leg.right.type=1"],
    "haslimbs": ["hasarms", "haslegs"],
    "noarms": ["arm.left=null", "arm.right=null"],
    "nolegs": ["leg.left=null", "leg.right=null"],
    "nolimbs": ["noarms", "nolegs"],
    # intelligence
    "smart":
    ["intelligence=atleast:50~100", "intelligenceImplant=30", "accent=0"],
    "genius": ["intelligence=100", "intelligenceImplant=30", "accent=0"],
    "dumb": ["intelligence=atmost:-50~-16", "intelligenceImplant=0"],
    # trust and devotion
    "devoted": ["trust=100", "oldTrust=100", "devotion=100", "oldDevotion=100"],
    # body shape and beauty
    "goodshape": [
        "weight=0", "muscles=31~50", "waist=atmost:-50~-10", "shoulders=0",
        "shouldersImplant=0", "hips=0~3", "hipsImplant=0", "boobsImplant=0",
        "boobsImplantType=none", "butt=1~4", "buttImplant=0",
        "buttImplantType=none", "face=atleast:50~100", "faceImplant=0",
        "faceShape=normal|cute|sensual|feline|exotic", "lips=21~70", "lipsImplant=0",
        "bellySag=0", "belly=0", "bellyImplant=0"
    ],
    "beautiful": [
        "waist=atmost:-95~-30", "lips=41~71", "anus=atmost:2",
        "vagina=atmost:2", "face=100", "faceShape=exotic", "teeth=normal",
        "minorInjury=0", "scar={}", "makeup=3", "nails=2", "health.tired=0",
        "boobShape=perky", "nipples=huge", "muscles=-4",
        "underArmHStyle=hairless|bald|waxed|shaved",
        "pubicHStyle=hairless|bald|waxed", "prestige=atleast:3",
        "porn.prestige=atleast:3"
    ],
    "petite": ["height=110~149", "heightImplant=0"],
    "short": ["height=150~159", "heightImplant=0"],
    "average": ["height=160~169", "heightImplant=0"],
    "tall": ["height=170~185", "heightImplant=0"],
    "verytall": ["height=186~210", "heightImplant=0"],
    "giant": ["height=atleast:220", "heightImplant=0"],
    "veryweak": ["muscles=-95~-31"],
    "weak": ["muscles=-30~-6"],
    "toned": ["muscles=6~30"],
    "fit": ["muscles=31~50"],
    "muscular": ["muscles=51~95"],
    "maleorgans": [
        "dick=inrange:2:3", "prostate=atleast:1", "balls=atleast:4",
        "scrotum=atleast:4", "pubertyXY=1"
    ],
    "XYorgans": ["maleorgans"],
    "femaleorgans": [
        "vagina=inrange:0:2", "vaginaLube=atleast:1", "ovaries=1",
        "preg=atleast:-1", "pubertyXX=1"
    ],
    "XXorgans": ["femaleorgans"],
    # boobs
    "bigboobs": [
        "boobs=atleast:3000~5100", "boobsImplant=0", "boobsImplantType=none",
        "boobShape=normal|perky|wide-set|torpedo-shaped", "nipples=cute|huge"
    ],
    "fakeboobs": [
        "boobs=atleast:3000~5100", "boobsImplant=600~1000",
        "boobsImplantType=fillable", "boobShape=perky", "nipples=huge|fuckable"
    ],
    "hugeboobs": [
        "boobs=atleast:6000~10000", "boobsImplant=0", "boobsImplantType=none",
        "boobShape=perky|wide-set|torpedo-shaped", "nipples=huge"
    ],
    "lactating": [
        "lactation=1", "lactationDuration=2",
        "lactationAdaptation=atleast:51~100", "rules.lactation=maintain"
    ],
    # butt
    "fakebutt": ["butt=3", "buttImplant=2", "buttImplantType=fillable"],
    # hair
    "randomhair": [
        "randomhaircolor", "randomhairlength", "randomhairstyle",
        "randompubichairstyle"
    ],
    "copyhaircolor": [
        "pubicHColor=ref:hColor", "eyebrowHColor=ref:hColor",
        "underArmHColor=ref:hColor"
    ],
    "randomhaircolor": [
        "hColor=blonde|golden|platinum blonde|strawberry-blonde|copper"
        "|ginger|red|green|blue|pink|dark brown|brown|auburn|burgundy"
        "|chocolate brown|chestnut|hazel|black|grey|silver|white",
        "copyhaircolor"
    ],
    "lighthaircolor": [
        "hColor=blonde|golden|platinum blonde|strawberry-blonde|copper"
        "|ginger|red|silver|white", "copyhaircolor"
    ],
    "darkhaircolor": [
        "hColor=dark brown|brown|auburn|burgundy|chocolate brown|chestnut"
        "|hazel|black|grey", "copyhaircolor"
    ],
    "funhaircolor": ["hColor=red|green|blue|pink|white", "copyhaircolor"],
    "randomhairlength": ["hLength=0~150"],
    "verylonghair": ["hLength=100~149"],
    "longhair": ["hLength=30~99"],
    "mediumhair": ["hLength=10~19"],
    "shoulderhair": ["mediumhair"],
    "shorthair": ["hLength=0~9"],
    "randomhairstyle": [
        "hStyle=shaved|buzzcut|trimmed|afro|cornrows|bun|neat|strip|tails"
        "|up|ponytail|braided|dreadlocks|permed|curled|luxurious|bald"
        "|messy bun|messy"
    ],
    "randompubicstyle": [
        "pubicHStyle=hairless|waxed|in a strip|neat|bushy|very bushy"
        "|bushy in the front and neat in the rear|bald"
    ],
    "randompubichairstyle": ["randompubicstyle"],
    # eyes
    "randomeyecolor": [
        "eye.left.iris=blue|black|brown|green|turquoise|sky-blue|hazel"
        "|pale-grey|white|pink|amber|red", "eye.right.iris=ref:eye.left.iris"
    ],
    "lighteyecolor": [
        "eye.left.iris=green|turquoise|sky-blue|pale-grey",
        "eye.right.iris=ref:eye.left.iris"
    ],
    "darkeyecolor": [
        "eye.left.iris=black|brown|hazel|amber",
        "eye.right.iris=ref:eye.left.iris"
    ],
    "funeyecolor":
    ["eye.left.iris=white|pink|red", "eye.right.iris=ref:eye.left.iris"],
    # age
    "teen": [
        "actualAge=10~19", "physicalAge=ref:actualAge",
        "visualAge=ref:actualAge", "ovaryAge=ref:actualAge", "ageImplant=0"
    ],
    "young": [
        "actualAge=18~25", "physicalAge=ref:actualAge",
        "visualAge=ref:actualAge", "ovaryAge=ref:actualAge", "ageImplant=0"
    ],
    "mature": [
        "actualAge=36~40", "physicalAge=ref:actualAge",
        "visualAge=ref:actualAge", "ovaryAge=30", "ageImplant=0"
    ],
    # skills and experience
    "skilled": [
        "skill.vaginal=atleast:51~100", "skill.oral=atleast:51~100",
        "skill.anal=atleast:51~100", "skill.whoring=atleast:51~100",
        "skill.entertainment=atleast:51~100", "skill.combat=1"
    ],
    "master": [
        "skill.vaginal=100", "skill.oral=100", "skill.anal=100",
        "skill.penetrative=100", "skill.whoring=100",
        "skill.entertainment=100", "skill.combat=1"
    ],
    "allroles": [
        "skill.headGirl=100~200", "skill.recruiter=100~200",
        "skill.bodyguard=100~200", "skill.madam=100~200", "skill.DJ=100~200",
        "skill.nurse=100~200", "skill.teacher=100~200",
        "skill.attendant=100~200", "skill.matron=100~200",
        "skill.stewardess=100~200", "skill.milkmaid=100~200",
        "skill.farmer=100~200", "skill.wardeness=100~200",
        "skill.servant=100~200", "skill.entertainer=100~200",
        "skill.whore=100~200"
    ],
    "experienced": [
        "counter.vaginal=atleast:1000~3000", "counter.anal=atleast:1000~3000",
        "counter.penetrative=atleast:1500~5000",
        "counter.oral=atleast:1000~3000", "counter.mammary=atleast:1000~3000"
    ],
    # behavior, fetishes, flaws and quirks
    "behaves": [
        "energy=atleast:50~100", "attrXX=atleast:50~100",
        "attrXY=atleast:50~100", "attrKnown=1", "fetishKnown=1",
        "behavioralFlaw=none", "sexualFlaw=none"
    ],
    "nympho": [
        "energy=100", "attrXX=100", "attrXY=100", "attrKnown=1",
        "fetishKnown=1", "fetish=none|submissive|boobs|dom|pregnancy",
        "fetishStrength=100", "behavioralFlaw=none", "sexualFlaw=none",
        "behavioralQuirk=none|none|none|none|confident|cutting|funny|fitness"
        "|sinful|advocate",
        "sexualQuirk=none|none|none|none|tease|romantic|perverted|caring"
        "|unflinching|size queen"
    ],
    # relationships
    "wife": ["relationship=-3", "relationshipTarget=-1"],
}


class FCBaseError(Exception):
    """Base class for exceptions defined in this file."""


class FCNotFoundError(FCBaseError):
    """Exception raised when a dotted path leads nowhere."""


class FCTypeError(FCBaseError):
    """Exception raised when a dotted path leads to a wrong type."""


class FCParamsError(FCBaseError):
    """Exception raised when a command-line parameter is incorret."""


class FCBadSelectorError(FCParamsError):
    """Exception raised when a selector returns no results."""


class AppendConstAction(argparse.Action):
    """argparse.Action similar to "append" but using a tuple (`const`, values).
    """

    def __init__(self, option_strings, dest, nargs=None, const=None, **kwargs):
        if nargs is None:
            raise ValueError("nargs must be supplied")
        if const is None:
            raise ValueError("const must be supplied")
        super(AppendConstAction, self).__init__(
            option_strings, dest, nargs=nargs, const=const, **kwargs)

    def __call__(self, parser, namespace, values, option_string=None):
        items = getattr(namespace, self.dest, None)
        if items is None:
            items = []
        else:
            items = items[:]
        items.append((self.const, values))
        setattr(namespace, self.dest, items)


class CommandGroupContainer:
    """Wrapper for an ArgumentParser that adds actions in a list."""

    def __init__(self, arg_parser=None, dest=None, action=AppendConstAction):
        if arg_parser is None:
            raise ValueError("arg_parser must be supplied")
        if not callable(getattr(arg_parser, "add_argument", None)):
            raise ValueError("arg_parser does not look like an ArgumentParser")
        if dest is None:
            raise ValueError("dest must be supplied")
        self.arg_parser = arg_parser
        self.dest = dest
        self.action = action
        self.help = []

    def command_from_docstring(self, func):
        """Registers a function in the ArgumentParser based on its docstring."""
        if func is None:
            raise ValueError("func must be supplied")
        if not func.__doc__:
            message = "cannot register function {} without docstring"
            raise ValueError(message.format(func.__name__))
        options = []
        arguments = []
        help_lines = []
        long_help_lines = None
        re_command = re.compile(r'^\s+Command:\s+(.+?)\s*$')
        for line in func.__doc__.splitlines():
            if not options:
                re_match = re_command.match(line)
                if re_match:
                    for arg in re_match.group(1).split():
                        if arg.startswith("-") and not arguments:
                            options.append(arg)
                        else:
                            arguments.append(arg)
            elif long_help_lines is None:
                if line and not line.isspace():
                    help_lines.append(line)
                else:
                    long_help_lines = []
            else:
                long_help_lines.append(line)
        if not options:
            message = "cannot find 'Command:' in docstring for function '{}'"
            raise ValueError(message.format(func.__name__))
        # Compare the function signature with its docstring here to catch
        # errors early instead of waiting until the function is called.
        expected_args = len(inspect.signature(func).parameters) - 2
        if expected_args != len(arguments):
            message = ("function '{}' expects {} arguments after save_obj but"
                       " its docstring shows {}")
            raise ValueError(
                message.format(func.__name__, expected_args, len(arguments)))
        # Now register this function, its help text, and number of arguments.
        short_help = textwrap.dedent("\n".join(help_lines)).strip()
        self.arg_parser.add_argument(
            *options,
            action=self.action,
            const=func,
            dest=self.dest,
            nargs=len(arguments),
            metavar=tuple(arguments),
            help=short_help)
        # Save the long help texts.  It would be nicer to store this in the
        # ArgumentParser and retrieve it later, but I could not find an
        # elegant way to do that without using its private classes.  The
        # handling of long help texts and the method format_long_help()
        # should probably be rewritten.
        long_help = textwrap.dedent("\n".join(long_help_lines)).strip()
        self.help.append([options, arguments, short_help, long_help])

    def format_long_help(self):
        """Returns a list of long help texts for all commands."""
        help_sections = []
        for help_list in self.help:
            for opt in help_list[0]:
                if opt.startswith("--"):
                    break
            else:
                opt = help_list[0][0]
            help_sections.append("\n".join([
                " ".join([opt] + help_list[1]), help_list[2], "", help_list[3]
            ]))
        return help_sections


class ParagraphWrapper:
    """Wrapper for TextWrapper, formatting text and lists in paragraphs.

    This class splits the text in paragraphs separated by blank lines.  Each
    paragraph is wrapped separately.  If a paragraph starts with "* " or "- ",
    it is considered as a list: the lines following the first one will be
    indented by two spaces.

    If the text is already indented (e.g., in a docstring), it will first be
    de-indented (using textwrap.dedent()) before the line wrapping is done.
    Additional blank lines before or after the text will be stripped.
    """

    def __init__(self, width=70, indent=None):
        if indent is None:
            indent = ""
        elif isinstance(indent, int):
            indent = " " * indent
        self.wrapper = textwrap.TextWrapper(
            width=width,
            initial_indent=indent,
            subsequent_indent=indent,
            fix_sentence_endings=True,
            break_long_words=False,
            break_on_hyphens=False)
        self.wrapper_list = textwrap.TextWrapper(
            width=width,
            initial_indent=indent,
            subsequent_indent=indent + "  ",
            fix_sentence_endings=True,
            break_long_words=False,
            break_on_hyphens=False)

    def format_paragraphs(self, text):
        """Wraps `text` to the specified width, preserving paragraph breaks."""
        return "\n\n".join([
            self.wrapper_list.fill(para) if para.startswith("* ") or
            para.startswith("- ") else self.wrapper.fill(para)
            for para in textwrap.dedent(text).strip().split("\n\n")
        ])


def deepmerge(dst, src, conflict_fail=False, list_skip_none=True):
    """Recursively merges the content of src into dst, modifying it as needed.

    This is function is designed to merge objects converted to and from JSON
    so it handles dictionaries, lists and scalar objects but not sets nor
    other classes.

    FIXME: obsolete description
    If both objects are dictionaries, then their keys are merged recursively.
    If both objects are lists, then the elements of src replace those of dst,
    unless an element of src is None and list_skip_none is True.  In all other
    cases src replaces dst, except if conflict_fail is True in which case a
    TypeError exception is thrown.

    After writing this code, I found a more complete (and more complex)
    implementation of JSON deep merge: https://github.com/avian2/jsonmerge
    but I think that the short code included here is good enough for what we
    need to do with the subset of JSON used in Twine/SugarCube save files.

    Args:
        dst: The object to be modified.
        src: The object from which the data will be copied.
        conflict_fail: If True, an exception is thrown if src and dest are not
            both dictionaries or lists.
        list_skip_none: If True and both src and dst are lists, then the
            elements of src that are None will be skipped.  If False and both
            src and dst are lists, then all elements of src will replace those
            of dst even if they are None.

    Returns:
        The results of the merge, which may be dst (modified) or src.

    Raises:
        FCTypeError: If src and dst are not both dictionaries or lists and if
            conflict_fail is True.
    """
    if isinstance(dst, dict) and isinstance(src, dict):
        for key in src:
            if key in dst:
                dst[key] = deepmerge(
                    dst[key],
                    src[key],
                    conflict_fail=conflict_fail,
                    list_skip_none=list_skip_none)
            else:
                dst[key] = src[key]
        return dst
    if isinstance(dst, list) and isinstance(src, list):
        for i in range(min(len(src), len(dst))):
            if not list_skip_none or src[i] is not None:
                dst[i] = deepmerge(
                    dst[i],
                    src[i],
                    conflict_fail=conflict_fail,
                    list_skip_none=list_skip_none)
        if len(src) > len(dst):
            dst.extend(src[len(dst):])
        return dst
    if ((dst is None or isinstance(dst, (str, int, float, bool))) and
            (src is None or isinstance(src, (str, int, float, bool)))):
        return src
    if conflict_fail:
        raise FCTypeError(f"Cannot merge {src.__class__.__name__} into "
                          "{dst.__class__.__name__}")
    return src


def deepfind(src,
             regex_key=None,
             regex_val=None,
             path=None,
             callback=None,
             context=None):
    """Searches recursively in `src` for a matching key name or value."""
    found = 0
    if path is None:
        path = []
    if isinstance(src, str):
        if regex_val is not None and regex_val.search(src):
            if callback:
                callback(path, src, context)
            found += 1
    elif isinstance(src, dict):
        for key in src:
            path.append(key)
            if regex_key is not None and regex_key.search(key):
                if callback:
                    callback(path, src[key], context)
                found += 1
            found += deepfind(
                src[key],
                regex_key=regex_key,
                regex_val=regex_val,
                path=path,
                callback=callback,
                context=context)
            path.pop()
    elif isinstance(src, list):
        # pylint: disable=consider-using-enumerate
        for idx in range(len(src)):
            path.append(idx)
            found += deepfind(
                src[idx],
                regex_key=regex_key,
                regex_val=regex_val,
                path=path,
                callback=callback,
                context=context)
            path.pop()
    return found


def dotted_to_str(path):
    """Converts a list of strings and ints into a Javascript-like dotted path.

    This is the opposite of parse_dotted().
    """
    return ".".join([
        f"[{part}]" if isinstance(part, int) else part for part in path
    ]).replace(".[", "[")


def parse_dotted(dotted_path):
    """Converts a Javascript-like dotted path to a list of strings and ints

    For example, the path "foo.bar[42][0].baz" will be decoded as a list
    ["foo", "bar", 42, 0, "baz"]
    """
    if dotted_path == "":
        return []
    re_idx = re.compile(r'^(.+)\[(\d+)\]$')
    plist = []
    for part in dotted_path.split("."):
        rlist = []
        re_idx_match = re_idx.match(part)
        while re_idx_match:
            part = re_idx_match.group(1)
            rlist.append(int(re_idx_match.group(2)))
            re_idx_match = re_idx.match(part)
        plist.append(part)
        plist.extend(reversed(rlist))
    return plist


def get_dotted(src, dotted_path, null_parent_ok=False):
    """Returns the object found at `dotted_path` in `src`."""
    # pylint: disable=too-many-branches
    plist = parse_dotted(dotted_path)
    obj = src
    done = "."
    for part in plist:
        if obj is None:
            if null_parent_ok:
                return None
            raise FCNotFoundError(f"cannot get field '{part}' from a null "
                                  f"object: '{done}'")
        if isinstance(part, int):
            if not isinstance(obj, list):
                raise FCTypeError(f"cannot get index {part} from object that "
                                  f"is not a list: '{done}'")
            elif part >= len(obj):
                raise FCNotFoundError(f"cannot get index {part} from list of "
                                      f"length {len(obj)}: '{done}'")
            else:
                obj = obj[part]
                done = done + "[" + str(part) + "]"
        else:
            if not isinstance(obj, dict):
                raise FCTypeError(f"cannot get field '{part}' from a list: "
                                  f"'{done}'")
            elif not part in obj:
                raise FCNotFoundError(f"field '{part}' not found in '{done}'")
            else:
                obj = obj[part]
                if done == ".":
                    done = part
                else:
                    done = done + "." + part
    return obj


def create_dotted(dotted_path, value):
    """Creates an object that contains `value` at `dotted_path`."""
    plist = parse_dotted(dotted_path)
    obj = value
    for part in reversed(plist):
        if isinstance(part, int):
            new_list = []
            for _ in range(part):
                new_list.append(None)
            new_list.append(obj)
            obj = new_list
        else:
            new_dict = {}
            new_dict[part] = obj
            obj = new_dict
    #print(f"create_dotted({dotted_path}, {value}): {obj}")
    return obj


def set_dotted(src, dotted_path, value, verbosity=None, conflict_fail=True):
    """Changes the value of `dotted_path` in `src` to `value`."""
    if verbosity:
        old_value = get_dotted(src, dotted_path, null_parent_ok=True)
        if value == old_value:
            if verbosity >= 2:
                print(" - {} = {}".format(dotted_path, value))
        else:
            if verbosity >= 1:
                print(" - {} changed from {} to {}".format(
                    dotted_path, old_value, value))
    return deepmerge(
        src, create_dotted(dotted_path, value), conflict_fail=conflict_fail)


def top_path_aliases(dotted_path):
    """Substitutes the aliases $V.*, $PC.*, slaves[*] in a top-level path."""
    rematch = re.match(r'^\$?V\.(\w.*)$', dotted_path)
    if rematch:
        dotted_path = "state.delta[0].variables." + rematch.group(1)
    else:
        rematch = re.match(r'^slaves?(\[\d.*)$', dotted_path)
        if rematch:
            dotted_path = "state.delta[0].variables.slaves" + rematch.group(1)
        else:
            rematch = re.match(r'^\$?PC\.(\w.*)$', dotted_path)
            if rematch:
                dotted_path = "state.delta[0].variables.PC." + rematch.group(1)
    return dotted_path


def parse_value(value, context_obj, path, ref_aliases=False):
    """Parses the string `value`, which may refer to `path` in `context_obj`.

    See also the documentation for command_set(), which gives more details.
    """
    # pylint: disable=no-member,too-many-branches
    # if value starts with "string:", return it as is without processing
    if value.startswith("string:"):
        return value[7:]
    # pick a random sub-expression if any "|" separators are present
    if "|" in value:
        value = random.choice(value.split("|"))
    # check for prefixes requiring a comparison with the old value
    compare_old = None
    if value.startswith("atleast:"):
        value = value[8:]
        compare_old = "max"
    elif value.startswith("atmost:"):
        value = value[7:]
        compare_old = "min"
    elif value.startswith("inrange:"):
        value = value[8:]
        compare_old = "range"
    # special values: A~B (random range), JSON values, or path to other value
    if "~" in value:
        vmin, vmax = value.split("~", 1)
        value = random.randint(int(vmin), int(vmax))
    elif re.match(r'^-?\d+$', value):
        value = int(value)
    elif re.match(r'^-?\d?\.\d+$', value):
        value = float(value)
    elif value == "null":
        value = None
    elif value == "true":
        value = True
    elif value == "false":
        value = False
    elif ((value.startswith("{") and value.endswith("}")) or
          (value.startswith("[") and value.endswith("]"))):
        value = json.loads(value)
    elif value.startswith("ref:"):
        if ref_aliases:
            value = get_dotted(
                context_obj, top_path_aliases(value[4:]), null_parent_ok=True)
        else:
            value = get_dotted(context_obj, value[4:], null_parent_ok=True)
    # now that we have the value, compare it with the old value if required
    if compare_old is not None:
        old_value = get_dotted(context_obj, path)
        if compare_old == "max":
            value = max(int(value), int(old_value))
        elif compare_old == "min":
            value = min(int(value), int(old_value))
        elif compare_old == "range":
            vmin, vmax = value.split(":", 1)
            value = min(int(vmax), max(int(vmin), int(old_value)))
        else:
            raise RuntimeError("invalid compare_old")
    return value


def fnmatch_slave_name(slave, name):
    """Returns true if the `slave` matches the `name` (with shell wildcards)."""
    field_names = ["slaveName", "slaveSurname", "birthName", "birthSurname"]
    regex = re.compile(fnmatch.translate(name))
    for field in field_names:
        if field in slave and slave[field] and regex.match(slave[field]):
            return True
    return False


def select_slaves(slaves, selector, show_fields=None):
    """Returns a list of slaves matching `selector`.

    The `selector` is usually a comma-separated list of conditions but it also
    accepts as special cases "all" or "*" to select all slaves, or square
    brackets including a number or a list of numbers representing a list of
    indexes in the `slaves` array.

    The standard conditions can be just a number matching a slave ID, or a
    slave name (with shell wildcards), or a comparison between a variable
    given by its dotted path and a scalar value (integer or string).

    Note that `show_fields` is modified if present.  Tt should be a set that
    will get additional elements for each dotted path found in the `selector`.
    """
    if show_fields is None:
        show_fields = set()
    selected = []
    # "all" or "All" or "*" => select all slaves
    if selector in {"all", "All", "*"}:
        return slaves
    # number or list of numbers in square brackets => array indexes
    rematch = re.match(r'^\[(\d+[,\d\s]*)\]$', selector)
    if rematch:
        for idx in re.split(r',\s*', rematch.group(1)):
            selected.append(slaves[int(idx)])
        return selected
    # list of comparisons (field=value, field<value, ...) or slave IDs or names
    for slave in slaves:
        for expr in re.split(r',\s*', selector):
            # if the condition is just a number, try to match a slave ID
            nummatch = re.match(r'^(\d+)$', expr)
            if nummatch and slave["ID"] == int(nummatch.group(1)):
                selected.append(slave)
                show_fields.add("ID")
                break
            # try different comparison operators: <=, <, >=, >, !=, ==, =
            for op_str, op_class, op_func in [
                    ("<=", int, operator.le),
                    ("<", int, operator.lt),
                    (">=", int, operator.ge),
                    (">", int, operator.gt),
                    ("!=", str, operator.ne),
                    ("==", str, operator.eq),
                    ("=", str, operator.eq),
            ]:
                rematch = re.match(rf'^(.+?)\s*{op_str}\s*(.+)$', expr)
                if rematch:
                    break
            else:
                op_func = None
            if op_func:
                if op_func(
                        op_class(get_dotted(slave, rematch.group(1))),
                        op_class(rematch.group(2))):
                    selected.append(slave)
                    show_fields.add(rematch.group(1))
                    break
                else:
                    continue
            # else try to match a slave name (shell wildcards allowed)
            if fnmatch_slave_name(slave, expr):
                selected.append(slave)
                show_fields.add("name")
                break
    # return what was found (maybe nothing)
    return selected


def expand_action(actions_dict, action):
    """Returns the expanded `action` from `actions_dict`, recursively."""
    actions_list = []
    for subaction in actions_dict[action]:
        if subaction in actions_dict:
            actions_list += expand_action(actions_dict, subaction)
        elif "=" in subaction:
            actions_list.append(subaction)
        else:
            raise FCParamsError("unknown action: '{}' used in "
                                "'{}'".format(subaction, action))
    return actions_list


def modify_slave(slave, actions_list, verbosity=None, ignore=None):
    """Modifies a slave or PC according to a list of actions.

    Each action can be a list of assignments or other actions that will be
    expanded recursively.  Assignments must contain an equal sign ("=") and
    will assign a new value to a field in the current slave or PC.  Special
    values are recognized by parse_value().

    Args:
        slave: The slave or PC to be modified.
        actions_list: The list of modifications to be applied.
        verbose: If true, print the list of changes.
        ignore: List of fields that should be ignored if found in an assignment.
    """
    if verbosity and verbosity >= 1:
        if slave["slaveName"]:
            print(f'Actions for slave {slave["ID"]} "{slave["slaveName"]}":'
                  f' {actions_list}')
        else:
            print(f'Actions for slave {slave["ID"]}: {actions_list}')
    if ignore is None:
        ignore = []
    assignments = []
    for action in actions_list:
        if action in SLAVE_ACTIONS:
            assignments += expand_action(SLAVE_ACTIONS, action)
        elif "=" in action:
            assignments.append(action)
        elif action == "":
            pass
        else:
            raise FCParamsError("unknown action: '{}'".format(action))
    for assignment in assignments:
        re_eq = re.match(r'^(.+?)\s*=\s*(.+)$', assignment)
        if re_eq:
            path = re_eq.group(1)
            if path in ignore:
                continue  # skip to the next assignment
            value = parse_value(re_eq.group(2), slave, path)
            set_dotted(
                slave, path, value, verbosity=verbosity, conflict_fail=False)
        else:
            raise FCParamsError("invalid assignment: '{}'".format(assignment))


def generate_slave_id(game_vars):
    """Returns the next available slave ID."""
    # for compatibility, use the same technique as the Javascript code
    all_slave_ids = []
    for slist in ["slaves", "cribs"]:
        all_slave_ids += [slave["ID"] for slave in game_vars[slist]]
        all_slave_ids += [slave["ID"] for slave in game_vars["incubator"]["tanks"]]
    while game_vars["IDNumber"] in all_slave_ids:
        game_vars["IDNumber"] += 1
    # ugly way to do the same as "return V.IDNumber++;" in src/js/utilsFC.js
    game_vars["IDNumber"] += 1
    return game_vars["IDNumber"] - 1


def generate_missing_parent_id(game_vars):
    """Returns the next available negative slave ID (starting at -10000)."""
    if game_vars["missingParentID"]:
        game_vars["missingParentID"] -= 1
    else:
        game_vars["missingParentID"] = -10001
    return game_vars["missingParentID"] + 1


def clone_slave(game_vars, orig_slave, same_parents=False):
    """Clone a slave `orig_slave` and give it a new ID."""
    new_slave = copy.deepcopy(orig_slave)
    new_slave["ID"] = generate_slave_id(game_vars)
    for zero_key in [
            "bodyswap", "clone", "cloneID", "cumSource", "daughters",
            "milkSource", "origBodyOwnerID", "preg", "pregType", "pregSource",
            "pregWeek", "readyOva", "recruiter", "relation", "relationTarget",
            "relationship", "relationshipTarget", "rivalry", "rivalryTarget",
            "sisters", "subTarget"
    ]:
        if zero_key in new_slave:
            new_slave[zero_key] = 0
    for counter in [
            "PCChildrenFathered", "PCKnockedUp", "births", "birthsTotal",
            "laborCount", "slavesFathered", "slavesKnockedUp"
    ]:
        if counter in new_slave["counter"]:
            new_slave["counter"][counter] = 0
    if "origBodyOwner" in new_slave:
        new_slave["origBodyOwner"] = ""
    if "womb" in new_slave:
        new_slave["womb"] = []
    if same_parents:
        # Add a sister (mother and father already copied but may need changes).
        if orig_slave["mother"] == -1:
            game_vars["PC"]["daughters"] += 1
        elif orig_slave["mother"] == 0 or orig_slave["mother"] == -2:
            orig_slave["mother"] = generate_missing_parent_id(game_vars)
            new_slave["mother"] = orig_slave["mother"]
        if orig_slave["father"] == -1:
            game_vars["PC"]["daughters"] += 1
        elif orig_slave["father"] == 0 or orig_slave["father"] == -2:
            orig_slave["father"] = generate_missing_parent_id(game_vars)
            new_slave["father"] = orig_slave["father"]
        # Adjust the counters of daughters and sisters.
        for slave in game_vars["slaves"]:
            if (slave["ID"] == new_slave["mother"] or
                    slave["ID"] == new_slave["father"]):
                slave["daughters"] += 1
            if (slave["mother"] == new_slave["mother"] or
                    slave["father"] == new_slave["father"] or
                    slave["mother"] == new_slave["father"] or
                    slave["father"] == new_slave["mother"]):
                slave["sisters"] += 1
                new_slave["sisters"] += 1
    else:
        # Clear the family info.
        new_slave["sisters"] = 0
        new_slave["mother"] = 0
        new_slave["father"] = 0
        new_slave["slaveSurname"] = 0
        new_slave["birthSurname"] = 0
    new_slave["slaveName"] = "Clone #{}".format(new_slave["ID"])
    if new_slave["birthName"]:
        # Append a number to the birth name, but check if it is not used yet.
        base_name = new_slave["birthName"]
        clone_num = 1
        end_num = re.match(r'^(.+) (\d+)$', base_name)
        if end_num:
            base_name = end_num.group(1)
            clone_num = int(end_num.group(2))
        for name in [slave["birthName"] for slave in game_vars["slaves"]]:
            end_num = re.match(rf'^{base_name} (\d+)$', name)
            if end_num and int(end_num.group(1)) > clone_num:
                clone_num = int(end_num.group(1))
        clone_num += 1
        new_slave["birthName"] = f"{base_name} {clone_num}"
    new_slave["assignment"] = "rest"
    if game_vars["JobIDMap"]:
        if "rest" in game_vars["JobIDMap"]:
            game_vars["JobIDMap"]["rest"].append(new_slave["ID"])
        else:
            game_vars["JobIDMap"]["rest"] = [new_slave["ID"]]
    if game_vars["slaveIndices"]:
        max_val = max(game_vars["slaveIndices"].values())
        game_vars["slaveIndices"][str(new_slave["ID"])] = max_val + 1
    game_vars["slaves"].append(new_slave)
    return new_slave


# Silence pylint here because many of the commands do not use their `options`.
# pylint: disable=unused-argument


def command_get(save_obj, target, options=None):
    """Returns the part of `save_obj` that matches the path `target`

    Command: -g --get VAR
        Get JSON object VAR (shortcuts: V.*, slaves[N].*, PC.*).

        The JSON object matching the dotted path `VAR` will be output.  The
        following shortcuts are availble:

        - V.* or $V.* replaces state.delta[0].variables.*

        - slaves[N].* replaces state.delta[0].variables.slaves[N].*, where N
        is the index number of the slave in the slaves array, starting at 0.

        - PC.* or $PC.* replaces state.delta[0].variables.PC.*

        This command should appear last on the command line, otherwise the
        selected object(s) will be replaced by the next command.
    """
    path = top_path_aliases(target)
    obj = get_dotted(save_obj, path)
    return obj


def command_set(save_obj, changes, options=None):
    """Applies the assignment(s) in `changes` to `save_obj`.

    Command: -s --set VAR=VAL[,VAR=VAL...]
        Set JSON object VAR to value VAL.

        Multiple assignments can be separated by commas, as long as they are
        passed as a single parameter on the command line (using quotes as
        necessary).

        Note that each dotted path `VAR` is relative to the top level of the
        game state.  The same shortcuts as for --get are available (V.*,
        slaves[N].*, PC.*).

        The value `VAR` can be any string or number, with special meanings
        interpreted in the following order:

        - If the value starts with "string:" then the following string will be
        used as is, disabling the interpretation of special characters except
        for the comma "," that always separates the assignments.

        - One or more "|" characters can be used to split the value in a list
        of sub-strings from which one will be picked at random.

        - If the value starts with "atleast:", "atmost:", or "inrange:", then
        the following string defines respectively the minimum, maximum, or
        both (two integers separated by ":") for `VAR`.  The old value of
        `VAR` will be compared with the limit(s) and will be changed only if
        necessary.

        - If the value contains two numbers (postive or negative) separated by
        "~" (tilde), then the result will be picked at random between these
        two numbers (inclusive).

        - If the value looks like an integer or a floating-point number, then
        the result will be converted to a number.  You can force a number to
        be interpreted as a string by prefixing it with "string:".

        - If the value is "null", "true" or "false", then it will be converted
        to JSON null, true or false.  You can force a special value to be
        interpreted as a string by prefixing it with "string:".

        - If the value is surrounded by "{" and "}" or by "[" and "]", then it
        will be interpreted as a JSON object or JSON list.
        Note: due to a limitation of the implementation, the assignments are
        split along the commas before the values are parsed, which means that
        it is currently not possible to supply a JSON object or list
        containing more than one element.  This can be considered as a bug.  A
        workaround is to use --json instead of --set.

        - If the value starts with "ref:", then it is interpreted as a
        reference to another variable.  The shortcuts V.*, PC.* or
        slave[N].* are allowed in the reference for the --set command but not
        for --set-slaves.

        The special meanings are interpreted in the order given above as the
        value is read, which allows some complex combinations.  For example,
        the value "10~20|ref:some.var|atleast:-5" means that the result will
        be either an integer between 10 and 20, or a copy of the other
        variable `some.var`, or will keep the current value as long as it is
        greater or equal to the minimum -5.  In this example, the choice
        delimiter "|" is interpreted first and one of the sub-strings is
        selected at random, then the value of that sub-string is parsed
        according to the next rules.
    """
    if options is not None and options.verbose:
        verbosity = options.verbose
    else:
        verbosity = None
    for assignment in re.split(r',\s*', changes):
        try:
            path, valexpr = assignment.split("=", 1)
        except ValueError:
            raise FCParamsError(
                "argument to --set should be of the form dotted.name=value: " +
                assignment)
        path = top_path_aliases(path)
        value = parse_value(valexpr, save_obj, path, ref_aliases=True)
        save_obj = set_dotted(save_obj, path, value, verbosity=verbosity)
    if changes:
        save_obj = set_dotted(save_obj, "state.delta[0].variables.cheater", 1)
    return save_obj


def command_json(save_obj, jstring, options=None):
    """Merges the JSON strong `jstring` into `save_obj`.

    Command: -j --json JSON
        Merge JSON string into JSON output.

        A JSON object (as complex as necessary) will be merged with the
        current state of the game.  As the merge is done from the top level,
        the object should probably follow the structure
        `{"state":{"delta":[{"variables":{...}}]}}` where "..." represents
        the variable(s) to be modified.
    """
    return deepmerge(save_obj, json.loads(jstring))


def _print_dotted(path, value, options):
    """Callback for find key/value: prints the path, not the value."""
    print(dotted_to_str(path))


def _print_dotted_val(path, value, options):
    """Callback for find key/value: prints the path and abbreviated value."""
    if options.width:
        width = options.width
    else:
        width = shutil.get_terminal_size().columns
    path_str = dotted_to_str(path)
    val_abbr = textwrap.shorten(
        json.dumps(value, sort_keys=options.sort),
        width=max(3, width - len(path_str)),
        placeholder="...")
    print(f"{path_str} = {val_abbr}")


def _print_dotted_val_full(path, value, options):
    """Callback for find key/value: prints the path and whole value."""
    val_str = json.dumps(value, sort_keys=options.sort, indent=options.indent)
    print(f"{dotted_to_str(path)} = {val_str}")


def command_find_key(save_obj, key_name, options=None):
    """Tries to find a key matching `key_name` in `save_obj`.

    Command: --find-key NAME
        Tries to find a VAR (key) that matches NAME.

        The NAME to search for can be specified as a string with optional
        shell wildcards ("*", "?") or as a regular expression surrounded by
        "/.../".

        For each key that matches NAME, the path to that key will be printed.
        If the verbosity level is at least one (-v), then the value will also
        be printed but limited to its first 30 characters.  If the verbosity
        level is at least 2 (-vv), then the whole value will be printed
        regardless of its length.

        If this option appears last on the command line, the total number of
        matches will be printed at the end.
    """
    re_match = re.match(r"^/(.+)/$", key_name)
    if re_match:
        regex_key = re.compile(re_match.group(1))
    else:
        regex_key = re.compile("^" + fnmatch.translate(key_name) + "$")
    if options is None or options.verbose <= 0:
        callback = _print_dotted
    elif options.verbose <= 1:
        callback = _print_dotted_val
    else:
        callback = _print_dotted_val_full
    return deepfind(
        save_obj, regex_key=regex_key, callback=callback, context=options)


def command_find_value(save_obj, value_str, options=None):
    """Tries to find a string containing `value_str` in `save_obj`.

    Command: --find-value NAME
        Tries to find a string value that matches NAME.

        The NAME to search for can be specified as a string with optional
        shell wildcards ("*", "?") or as a regular expression surrounded by
        "/.../".

        For each key that matches NAME, the path to that key will be printed.
        If the verbosity level is at least one (-v), then the value will also
        be printed but limited to its first 30 characters.  If the verbosity
        level is at least 2 (-vv), then the whole value will be printed
        regardless of its length.

        If this option appears last on the command line, the total number of
        matches will be printed at the end.
    """
    re_match = re.match(r"^/(.+)/$", value_str)
    if re_match:
        regex_val = re.compile(re_match.group(1))
    else:
        regex_val = re.compile("^" + fnmatch.translate(value_str) + "$")
    if options is None or options.verbose <= 0:
        callback = _print_dotted
    elif options.verbose <= 1:
        callback = _print_dotted_val
    else:
        callback = _print_dotted_val_full
    return deepfind(
        save_obj, regex_val=regex_val, callback=callback, context=options)


def command_get_slaves(save_obj, selector, show_vars, options=None):
    """Returns specific fields from the slaves matching `selector`.

    Command: --get-slaves SELECTOR VAR[,VAR...]
        Select the slaves matching SELECTOR and output the fields
        named VAR plus those used for the selection, or "*" to output
        all fields.

        SELECTOR can be one of the following:

        - "*", "all", or "All" to select all slaves.

        - A condition or comma-separated list of conditions, using one of
        the numerical comparison operators "<", "<=", ">", ">=", or a string
        comparison "!=" or "==", or just a number matching a slave ID, or a
        name matching a slave name, surname, birth name or birth surname
        (shell wildcards are allowed).  Any slave that matches at least one
        of the conditions will be selected.  For example,
        "Miss A*, skill.oral<30" would select Miss Anne and any slave who has
        less than 30 in the oral skill.

        - In square brackets "[...]", a number or a comma-separated list of
        numbers.  The numbers will be used as indexes in the slaves array,
        starting at 0.  As the ordering of the slaves array is difficult to
        predict, it is usually better to refer to the slaves by their ID
        or by their name as described in the previous paragraph instead of
        using their index in square brackets.

        This command should appear last on the command line, otherwise the
        selected object(s) will be replaced by the next command.

        VAR,[,VAR...] can be one of the following:

        - "" (empty), "*", "all", or "All" to select all fields for each slave

        - A dotted path to a variable such as "eye.left" or "intelligence",
        or a comma-separated list of them.

        - One of the special aliases "name", "names", "parent", or "parents".
        "name" or "names" will be replaced by "birthName", "birthSurname",
        "slaveName", "slaveSurname".  "parent" or "parents" will be replaced
        by "mother" and "father".
    """
    if selector is None:
        raise RuntimeError("missing selector for --get-slaves command")
    slaves = get_dotted(save_obj, "state.delta[0].variables.slaves")
    show_fields = {"ID"}
    selected = select_slaves(slaves, selector, show_fields=show_fields)
    if show_vars and show_vars not in {"all", "All", "*"}:
        for field in re.split(r',\s*', show_vars):
            show_fields.add(field)
        for field in FIELD_ALIASES:
            if field in show_fields:
                for new_field in FIELD_ALIASES[field]:
                    show_fields.add(new_field)
                show_fields.remove(field)
        filtered = []
        for slave in selected:
            out = {}
            for field in show_fields:
                set_dotted(out, field, get_dotted(slave, field))
            filtered.append(out)
        return filtered
    return selected


def command_set_slaves(save_obj, selector, changes, options=None):
    """Modifies the slaves matching `selector` according to `changes`.

    Command: --set-slaves SELECTOR VAR=VAL[,VAR=VAL...]
        Modify all slaves matching SELECTOR and apply the changes VAR=VAL.

        If this command appears last on the command line and the output is
        uncompressed JSON, then only the selected slaves will be output.
        Using --set-slaves with an empty list of assignments ("") produces
        the same results as --get-slaves with the same selector and an empty
        list of selected fields or "*".

        If the verbosity level is at least 1, then the list of changes will
        be printed for each slave.  If the verbosity level is at least 2,
        then the list of variables that are checked but not changed (because
        their value is already acceptable) will also be printed.
    """
    if selector is None:
        raise RuntimeError("missing selector for set_slaves command")
    if changes is None:
        raise RuntimeError("missing assignments for set_slaves command")
    if options is not None and options.verbose:
        verbosity = options.verbose
    else:
        verbosity = None
    slaves = get_dotted(save_obj, "state.delta[0].variables.slaves")
    selected_slaves = select_slaves(slaves, selector)
    assignments = re.split(r',\s*', changes)
    for slave in selected_slaves:
        modify_slave(
            slave, assignments, verbosity=verbosity, ignore=IGNORE_IN_SLAVES)
    if changes:
        save_obj = set_dotted(save_obj, "state.delta[0].variables.cheater", 1)
    return selected_slaves


def _command_copy_or_clone(save_obj,
                           selector,
                           changes,
                           options=None,
                           same_parents=False):
    """Implements command_copy_slave or command_clone_slave."""
    if selector is None:
        raise RuntimeError("missing selector for copy_slaves command")
    if changes is None:
        raise RuntimeError("missing assignments for copy_slaves command")
    if options is not None and options.verbose:
        verbosity = options.verbose
    else:
        verbosity = None
    game_vars = get_dotted(save_obj, "state.delta[0].variables")
    selected_slaves = select_slaves(game_vars["slaves"], selector)
    if not selected_slaves:
        raise FCBadSelectorError("no slaves match the selector "
                                 "'{}'".format(selector))
    new_slave = clone_slave(
        game_vars, selected_slaves[-1], same_parents=same_parents)
    assignments = re.split(r',\s*', changes)
    modify_slave(
        new_slave, assignments, verbosity=verbosity, ignore=IGNORE_IN_SLAVES)
    save_obj = set_dotted(save_obj, "state.delta[0].variables.cheater", 1)
    return new_slave


def command_copy_slave(save_obj, selector, changes, options=None):
    """Returns a copy of the last slave matching `selector`.

    Command: --copy-slave SELECTOR VAR=VAL[,VAR=VAL...]
        Copy the last slave matching SELECTOR and apply the changes VAR=VAL.

        A copy of the slave matching SELECTOR (or of the last match if
        the selector matches multiple slaves) is created and then modified
        according to the assignments VAR=VAL.  The new clone has no family.

        The new clone is named "Clone #ID" where ID is its ID number.  You
        can rename the new clone by including "slaveName=NNN" in the list
        of assignments, where NNN is the new name of the clone.

        The commands --copy-slave and --clone-slave are similar, but
        --copy-slave erases the family relationships and family name of the
        clone, so it forgets about its origins.
    """
    return _command_copy_or_clone(
        save_obj, selector, changes, options=options, same_parents=False)


def command_clone_slave(save_obj, selector, changes, options=None):
    """Returns a clone of the last slave matching `selector`.

    Command: --clone-slave SELECTOR VAR=VAL[,VAR=VAL...]
        Clone the last slave matching SELECTOR and apply the changes VAR=VAL.

        A clone of the slave matching SELECTOR (or of the last match if
        the selector matches multiple slaves) is created and then modified
        according to the assignments VAR=VAL.  The new clone is a twin sister
        of the original slave.

        The new clone is named "Clone #ID" where ID is its ID number.  You
        can rename the new clone by including "slaveName=NNN" in the list
        of assignments, where NNN is the new name of the clone.

        The commands --copy-slave and --clone-slave are similar, but
        --clone-slave creates the clone as a sister of the original slave,
        keeping the same family name.  The number of daughters and sisters
        of the other family members are updated accordingly.

        The clone will have the same age as the original slave so it will be
        her twin sister, but you can change that by assigining a different
        age to the clone or using one of the shortcut actions "teen", "young",
        or "mature".
    """
    return _command_copy_or_clone(
        save_obj, selector, changes, options=options, same_parents=True)


def command_get_pc(save_obj, show_vars, options=None):
    """Returns specific fields from the player character.

    Command: --get-pc VAR[,VAR...]
        Output the fields of the PC named VAR, or "*" to output all fields.

        This command should appear last on the command line, otherwise the
        selected object(s) will be replaced by the next command.
    """
    player = get_dotted(save_obj, "state.delta[0].variables.PC")
    show_fields = set()
    if show_vars and show_vars not in {"all", "All", "*"}:
        for field in re.split(r',\s*', show_vars):
            show_fields.add(field)
        for field in FIELD_ALIASES:
            if field in show_fields:
                for new_field in FIELD_ALIASES[field]:
                    show_fields.add(new_field)
                show_fields.remove(field)
        out = {}
        for field in show_fields:
            set_dotted(out, field, get_dotted(player, field))
        return out
    return player


def command_set_pc(save_obj, changes, options=None):
    """Applies some `changes` to the player character.

    Command: --set-pc VAR=VAL[,VAR=VAL...]
        Modify the player character according to the changes VAR=VAL.

        This is similar to --set-slaves, but for the player character.  The
        same shortcut actions (see --list-actions) can be used for the PC, but
        the ones modifying fields that do not exist in the PC will be silently
        ignored.

        If this command appears last on the command line and the output is
        uncompressed JSON, then only the PC object will be output.
    """
    if changes is None:
        raise RuntimeError("missing assignments for set_pc command")
    if options is not None and options.verbose:
        verbosity = options.verbose
    else:
        verbosity = None
    player = get_dotted(save_obj, "state.delta[0].variables.PC")
    assignments = re.split(r',\s*', changes)
    modify_slave(player, assignments, verbosity=verbosity, ignore=IGNORE_IN_PC)
    if changes:
        save_obj = set_dotted(save_obj, "state.delta[0].variables.cheater", 1)
    return player


def command_top_up(save_obj, options=None):
    """Tops up the cach and reputation.

    Command: --top-up --topup
        Maximize cash (100M) and reputation (20k).

        This is a quick way to get a ridiculously high amount of money and
        unlock all features of the arcology without having to click 1000 times
        on "Add 100000 money" in cheat mode.  Of course you will be flagged as
        a cheater if you use this command or any other command that modifies
        the state of the game.
    """
    return command_set(
        save_obj, "V.cash=100000000, V.rep=20000", options=options)


# pylint: enable=unused-argument


def list_actions(width=None, verbosity=0):
    """Prints the list of shortcuts ("actions") for the assignments."""
    maxkeylen = max([len(key) for key in SLAVE_ACTIONS])
    if width:
        if width < max(40, maxkeylen + 20):
            raise FCParamsError("width {} must be at least "
                                "{}".format(width, max(40, maxkeylen + 20)))
    else:
        width = shutil.get_terminal_size().columns - 2
    wrapper = textwrap.TextWrapper(
        width=width,
        subsequent_indent=(" " * (maxkeylen + 2)),
        break_long_words=False,
        break_on_hyphens=False)
    print("The following actions can replace an assignment VAR=VAL:")
    if verbosity < 3:
        print("(You can increase the verbosity level to see more details)")
    if verbosity >= 1:
        if verbosity >= 2:
            actions = {}
            for key in SLAVE_ACTIONS:
                actions[key] = expand_action(SLAVE_ACTIONS, key)
        else:
            actions = SLAVE_ACTIONS
        for key in sorted(actions):
            print(
                wrapper.fill("{:<{}} {}".format(key, maxkeylen, actions[key])))
        if verbosity >= 3:
            all_assignments = []
            for assignments in actions.values():
                all_assignments += assignments
            print("\nThese actions include the following assignments:")
            for assignment in sorted(set(all_assignments)):
                print(wrapper.fill(assignment))
    else:
        for key in sorted(SLAVE_ACTIONS):
            print(key)


def read_game_file(infile, compressed=True):
    """Reads and returns the optionally compressed JSON data from infile."""
    if compressed:
        b64_data = infile.read()
        json_string = lzstring.LZString().decompressFromBase64(b64_data)
    else:
        json_string = infile.read()
    parsed_json = json.loads(json_string)
    return parsed_json


def write_game_file(outfile, obj, compressed=True, indent=None, sort_keys=True):
    """Writes obj as JSON string in outfile, with optional compression."""
    if indent is not None and indent > 0:
        separators = (',', ': ')
    else:
        separators = (',', ':')
    json_string = json.dumps(
        obj, indent=indent, sort_keys=sort_keys, separators=separators)
    if compressed:
        b64_data = lzstring.LZString().compressToBase64(json_string)
        outfile.write(b64_data)
    else:
        outfile.write(json_string)
        outfile.write("\n")


def modify_file_name(orig_name, suffix="-cheat"):
    """Modifies a file name to insert a suffix before the file extension."""
    if orig_name is None or orig_name == "-" or orig_name == "<stdin>":
        raise FCParamsError("the input is not a named file.  Cannot generate "
                            "output file name")
    # If the suffix is already present before the file extension, add a number.
    re_fname = re.match(rf"^(.+{re.escape(suffix)})(\d+)(\..+?)$", orig_name)
    if re_fname:
        return "".join([
            re_fname.group(1),
            str(int(re_fname.group(2)) + 1),
            re_fname.group(3)
        ])
    re_fname = re.match(rf"^(.+{re.escape(suffix)})(\..+?)$", orig_name)
    if re_fname:
        return "".join([re_fname.group(1), "2", re_fname.group(2)])
    # If there is no suffix but there is a file extension, insert it before.
    re_fname = re.match(r"^(.+)(\..+?)$", orig_name)
    if re_fname:
        return "".join([re_fname.group(1), suffix, re_fname.group(2)])
    # If the suffix is already present without file exension, add a number.
    re_fname = re.match(rf"^(.+{re.escape(suffix)})(\d+)$", orig_name)
    if re_fname:
        return "".join([re_fname.group(1), str(int(re_fname.group(2)) + 1)])
    re_fname = re.match(rf"^(.+{re.escape(suffix)})$", orig_name)
    if re_fname:
        return "".join([re_fname.group(1), "2"])
    # Else just append the suffix.
    return orig_name + suffix


def print_long_help(help_sections, width=None, verbosity=0):
    """Displays the detailed help messages when --long-help is used."""

    def print_title(line):
        """Prints a line followed by a line of dashes of the same length."""
        print(line)
        print("-" * len(line))

    long_help_intro_text = """
    The commands can appear multiple times on the command line.  They
    modify the game variables loaded from the input file.

    VAR, VAL, VAR=VAL, and SELECTOR have the following meanings:

    - VAR is a dotted path to an object, such as "arm.left.type" for a
    slave or "state.delta[0].variables.slaves[0]" from the top level.

    - VAL can be a string, a number, true, false, null, a set of random
    choices separated by "|", a random number from a range A~B (using "~"),
    a JSON object or array if it is surrounded by "{}" or "[]", a reference
    to another variable prefixed with "ref:", or a string without any of
    these special meanings if prefixed with "string:".  See --set for
    details.

    - SELECTOR selects one or more slaves by id (number or comma-separated
    list of numbers), by condition ("intelligence>50" or "genes=XY"), or by
    name or comma-separated list of names with wildcards (matching name,
    surname, birth name, or birth surname).  See --get-slaves for details.
    "*" or "all" selects all slaves.

    - Assignments VAR=VAL can be repeated, separated by commas.  They can
    also be replaced by actions that are shortcuts to a list of assignments.
    Use --list-actions to see the list of shortcuts and their expansion.

    The commands --get, --get-slaves and --get-pc are only useful if they
    appear last on the command line and if the output is not compressed.
    In that case, only the selected objects will be output in JSON format.
    Otherwise the output will include the whole game state.
    """
    long_examples = [
        """{prog} -i free-cities-123456.save -p -O free-cities-123456.json

        Loads the file "free-cities-123456.save" (-i ...) and saves its
        contents as a JSON file (-O ...) with nice indentation (-p).  You can
        then use any JSON processing tool to analyze the contents of this new
        file or modify it.  Without the arguments
        "-O free-cities-123456.json", this command would send the formatted
        JSON to standard output where it could be directly piped to other
        commands such as "grep".
        """,
        """{prog} -I free-cities-123456.json -o free-cities-123456.save

        Loads the JSON file "free-cities-123456.json" (-I ...) and saves it as
        a compressed file "free-cities-123456.save" (-o ...).
        """,
        """{prog} -i fc-123456.save -p --get-slaves all name,career,assignment

        Selects all slaves from the file "fc-123456.save" and prints their
        names and surnames, as well as their past career and current
        assignment.
        """,
        """{prog} -i fc-123456.save -A --clone-slave "Miss Lily" "Nurse,slaveName=Doctor Diana,randomhair"

        Creates a twin sister of the slave called "Miss Lily" and modifies the
        new clone to be an ideal nurse (which makes her your genius, beautiful
        wife with a dom fetish and career experience as a nurse).  Sets her
        slave name to be "Doctor Diana" and randomizes her hairstyle and
        color.  Saves the results in a file called "fc-123456-cheat.save"
        (option -A with the default suffix "-cheat").
        """,
        """{prog} -i fc-123456.save -A --set-slaves "intelligence>50" nympho,bimbo

        Selects all your smart slaves (intelligence>50) and turns them into
        dumb bimbos with fake boobs and fake butt who are addicted to sex.
        Saves the results in a file called fc-123456-cheat.save.
        """,
        """{prog} -i fc-123456.save --set-slaves all healthy,boobs=atleast:900 --no-output -v

        Selects all slaves and displays what changes would be applied to make
        them healthy with boobs that are at least DD-cup.  A summary of the
        changes is displayed (-v) but they are not saved to a file nor shown
        on standard output (--no-output).  With an additional verbosity level
        (-vv), this command would also display a detailed list of variables
        that are checked but not changed if their value is already in the
        acceptable range.
        """,
        """{prog} -i fc-123456.save --suffix=-godmode -A --top-up --set-slaves all perfect,experienced

        Maximizes your money and reputation (--top-up), then modifies all
        slaves to be healthy geniuses with goddess bodies, perfect skills and
        experience.  Saves the results in a new file called
        "fc-123456-godmode.save" (option -A with a custom --suffix).
        Playing the game would be rather pointless with that extreme cheating
        but this can be useful for testing some new features.
        """,
        """{prog} --list-actions -v

        Lists the shortcuts (actions) for the assignments that can be used
        with the commands --set-slaves, --copy-slave, --clone-slave, or
        --set-pc.  With verbosity level 1 (-v), this command shows the
        lists of assignments or other actions associated with each action.
        With verbosity level 2 (-vv), these lists would be expanded
        recursively.  With the default verbosity (no -v), only the names of
        the actions would be listed.
        """
    ]
    if width:
        minwidth = 30
        if width < minwidth:
            raise FCParamsError(f"width {width} must be at least {minwidth}")
    else:
        width = shutil.get_terminal_size().columns - 2
    print_title("Specifying commands")
    help_wrapper = ParagraphWrapper(width=width, indent=0)
    print(help_wrapper.format_paragraphs(long_help_intro_text))
    print("\n")
    print_title("List of available commands")
    indent_wrapper = ParagraphWrapper(width=width, indent=8)
    for help_section in help_sections:
        (first_line, _, other_lines) = help_section.partition("\n")
        print(help_wrapper.format_paragraphs(first_line))
        print(indent_wrapper.format_paragraphs(other_lines))
        print("")
    print_title("Examples")
    for example in long_examples:
        (first_line, _,
         other_lines) = example.replace("{prog}", sys.argv[0]).partition("\n")
        print(help_wrapper.format_paragraphs(first_line))
        print(indent_wrapper.format_paragraphs(other_lines))
        print("")


def main():
    """If you run this program from the command line, you will end up here..."""

    parser = argparse.ArgumentParser(
        description="View or modify Free Cities save files, compressed or not.",
        fromfile_prefix_chars="@",
        epilog="These commands modify the game variables and can appear"
        " multiple times on the command line.  The commands --get,"
        " --get-slaves and --get-pc are only useful if they appear last on the"
        " command line and if the output is not compressed.  See --long-help"
        " for details.")
    parser.add_argument(
        "-H",
        "--long-help",
        action="store_true",
        help="More detailed help and examples.")
    parser.add_argument(
        "-V",
        "--version",
        action="version",
        version="%(prog)s " + __version__,
        help="Show this program's version number and exit.")
    infile_group = parser.add_mutually_exclusive_group()
    infile_group.add_argument(
        "-i",
        "--infile",
        "--input",
        type=argparse.FileType("r"),
        help="Name of the compressed input file.")
    infile_group.add_argument(
        "-I",
        "--injson",
        "--input-json",
        type=argparse.FileType("r"),
        default=sys.stdin,
        help="Name of the JSON input file (default: stdin).")
    outfile_group = parser.add_mutually_exclusive_group()
    outfile_group.add_argument(
        "-o",
        "--outfile",
        "--output",
        type=argparse.FileType("w"),
        help="Name of the compressed output file.")
    outfile_group.add_argument(
        "-O",
        "--outjson",
        "--output-json",
        type=argparse.FileType("w"),
        default=sys.stdout,
        help="Name of the JSON output file (default: stdout).")
    outfile_group.add_argument(
        "-A",
        "--output-auto",
        action="store_true",
        help="Generate the output file name from the input file name by adding"
        " a suffix to it (see --suffix).  The output will be compressed or"
        " not, depending on the type of the input.")
    outfile_group.add_argument(
        "-n",
        "--no-output",
        action="store_true",
        help="Do not output the JSON data.  Can be used with an increased"
        " verbosity level to see what changes are applied without saving them.")
    parser.add_argument(
        "-a",
        "--output-all",
        action="store_true",
        help="When the output is uncompressed JSON, output the whole game state"
        " even if only a part of it is selected by the last command.")
    parser.add_argument(
        "-v",
        "--verbose",
        action="count",
        default=0,
        help="Verbosity level when modifying data or for --list-actions.  Can"
        " be repeated to be more verbose (default: 0).")
    parser.add_argument(
        "--width",
        action="store",
        type=int,
        help="Width of the output for --list-actions (default is term width).")
    parser.add_argument(
        "--suffix",
        action="store",
        type=str,
        default="-cheat",
        help="Suffix added to the file name by --output-auto (default:"
        " '-cheat').  Can be set to an empty string if you want to overwrite"
        " the input file.  Note: if the suffix starts with a dash, write this"
        " argument as '--suffix=-mysuffix' and not '--suffix -mysuffix'.")
    parser.add_argument(
        "--indent",
        action="store",
        type=int,
        help="Indent the JSON output by that many spaces per level.")
    parser.add_argument(
        "--sort", action="store_true", help="Sort the JSON keys.")
    parser.add_argument(
        "-p",
        "--pretty-print",
        action="store_true",
        help="Same as --indent 2 --sort.")
    parser.add_argument(
        "--list-actions",
        action="store_true",
        help="Print the list of known actions (shortcuts) and exit.  With"
        " increased verbosity levels you can see the list of actions, their"
        " definitions, the fully expanded definitions, and the list of"
        " assignments.")
    parser.add_argument(
        "--no-taint", action="store_true", help=argparse.SUPPRESS)
    cmd_arg_group = parser.add_argument_group("optional, repeatable commands")
    cmd_group = CommandGroupContainer(cmd_arg_group, dest="commands")
    # Register all functions that declare arguments in their docstring
    cmd_group.command_from_docstring(command_get)
    cmd_group.command_from_docstring(command_set)
    cmd_group.command_from_docstring(command_json)
    cmd_group.command_from_docstring(command_find_key)
    cmd_group.command_from_docstring(command_find_value)
    cmd_group.command_from_docstring(command_get_slaves)
    cmd_group.command_from_docstring(command_set_slaves)
    cmd_group.command_from_docstring(command_copy_slave)
    cmd_group.command_from_docstring(command_clone_slave)
    cmd_group.command_from_docstring(command_get_pc)
    cmd_group.command_from_docstring(command_set_pc)
    cmd_group.command_from_docstring(command_top_up)
    # And now try to make sense of all this
    try:
        args = parser.parse_args()

        if args.long_help:
            print_long_help(
                cmd_group.format_long_help(),
                width=args.width,
                verbosity=args.verbose)
            exit(0)
        if args.list_actions:
            list_actions(width=args.width, verbosity=args.verbose)
            exit(0)
        if args.pretty_print:
            args.indent = 2
            args.sort = True
        if args.output_auto:
            if args.infile is not None:
                outname = modify_file_name(args.infile.name, suffix=args.suffix)
                args.outfile = open(outname, "w")
            else:
                outname = modify_file_name(args.injson.name, suffix=args.suffix)
                args.outjson = open(outname, "w")
    except FCBaseError as error:
        print(f"Error in command-line arguments: {error}.")
        exit(2)

    if args.infile is not None:
        parsed_json = read_game_file(args.infile, compressed=True)
    else:
        parsed_json = read_game_file(args.injson, compressed=False)

    # Execute all commands that were passed on the command line
    if args.commands:
        for func, fargs in args.commands:
            try:
                result_obj = func(parsed_json, *fargs, options=args)
            except FCBaseError as error:
                fname = func.__name__.replace("command_", "").replace("_", "-")
                if isinstance(error, FCParamsError) and fargs:
                    print("Error in {}: {} in arguments "
                          "{}".format(fname, str(error), fargs))
                else:
                    print("Error in {}: {}".format(fname, str(error)))
                exit(2)
    else:
        result_obj = parsed_json

    # Unless the --no-taint option has been used, add a variable that marks
    # the save file as tainted.  This should help when triaging bug reports:
    # if a tainted save file appears in a bug report, then the user could be
    # asked to try and reproduce the bug without hacking the state of the
    # game.
    if not args.no_taint:
        set_dotted(parsed_json, "state.delta[0].variables.taintedSaveFile",
                   "{} v{}".format(os.path.basename(sys.argv[0]), __version__))

    if args.no_output:
        pass
    elif args.outfile is not None:
        write_game_file(
            args.outfile,
            parsed_json,
            compressed=True,
            indent=args.indent,
            sort_keys=args.sort)
    elif args.output_all:
        write_game_file(
            args.outjson,
            parsed_json,
            compressed=False,
            indent=args.indent,
            sort_keys=args.sort)
    else:
        write_game_file(
            args.outjson,
            result_obj,
            compressed=False,
            indent=args.indent,
            sort_keys=args.sort)


if __name__ == '__main__':
    main()
