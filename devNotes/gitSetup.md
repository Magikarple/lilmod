# Git setup & work cycle

## First time setup

0. [Install Git for terminal](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) or a Git GUI of your
   choice.
   * If you are on Linux Git is usually preinstalled.

1. Create an account on gitgud if you don't have a usable one.
    * (optional) Add an SSH key to your account for easier pushing. This allows you to connect to gitgud through SHH,
      which doesn't require your credentials every time.

2. Fork the main repository through gitgud interface.
   * (optional) Delete all branches other than pregmod-master, so you don't get them locally when fetching.

3. Clone the repo
   * Clicking on the dropdown arrow on the far right blue clone button in the GitGud interface on your fork gives you
     the relevant URLs. If you added an SSH key in step 2, use the SSH URL, otherwise use the HTTPS one.
   * Via terminal: `git clone --depth 1 <url-to-your-fork>`

4. Change into the new directory
   * Via terminal: `cd fc-pregmod`

5. Add the main repository as a remote target
   * Via terminal: `git remote add upstream https://gitgud.io/pregmodfan/fc-pregmod.git`

6. Make your local `pregmod-master` track the main repository, makes getting future updates easier.
   * Via terminal `git branch --set-upstream-to=upstream/pregmod-master`

## Typical cycle with Git:

0. Switch to the `pregmod-master` branch, then apply any updates from upstream
   * Via terminal: `git checkout pregmod-master && git pull upstream`

1. Checkout a new branch for your work
   * Via terminal: `git checkout -b <branch-name>`

2. Make desired changes

3. Add your changes to be committed
   * Via terminal: `git add *`

4. Commit your changes
   * Via terminal: `git commit`
   * Make the commit message useful (`Fix X`, `Add Y`, etc.)

5. (optional, but recommended) Run sanityCheck before final push to catch any errors you missed.
   * You can ignore errors that already existed

6. Push result into your forked repository
   * Via terminal:
      * Initially: `git push -u origin $(git rev-parse --abbrev-ref HEAD)`
      * Afterwards `git push` will suffice.

7. Create merge request through gitgud interface.
   * Suggestion: Tick `Delete source branch when merge request is accepted.` to help automatically tidy up your fork.

8. Checkout `pregmod-master` in preparation of next change.
   * Via terminal: `git checkout pregmod-master`

9. Once the merge request was accepted, delete your local branch.
   * Via terminal: `git branch -d <branch-name>`

## Tips

* Never commit anything on the main `pregmod-master` branch, always use feature branches.
* To check the current state of your local copy, use `git status`.
* To get a list of all current branches run `git branch --list` via terminal.
