<!-- cSpell:ignore lzstring -->

# Tool(s) for hacking saved games

The script `fc_edit_save.py` can be used to read or write FC games saved with the "Save to Disk..." option.
It can convert the compressed files (usually named `free-cities-YYYYMMDD-HHMMSS.save`) to or from JSON format,
view or modify some variables, search for slaves matching some criteria to view or modify them, etc.

## Dependencies

The script `fc_edit_save.py` requires Python version 3.6 or later.

In addition, it uses a small module called `lzstring`, available via [PyPI](https://pypi.org/project/lzstring/).
If you do not have it yet, you can install it with `pip3 install lzstring` or simply `pip install lzstring` if
your default version of Python is already Python 3.x.  You can also install the module manually from PyPI
without using `pip`, but then you are on your own for copying the files in the right locations.

## Usage

To view the help message summarizing the command-line arguments, try:
```
./fc_edit_save.py --help
```

To view a longer help message including details for each command and a list of examples, try:
```
./fc_edit_save.py --long-help
```

The basic usage consists of:

 * reading an input file (compressed `*.save` file with the option `-i`, or uncompressed JSON file with the
   option `-I`),

 * optionally modifying it with various commands,

 * then saving the result in some output file (compressed `*.save` file with the option `-o`, or uncompressed
   JSON file with the option `-O`).

If the options `-i`/`-I` or `-o`/`-O` are not used, then the standard input and standard output will be used, which
allows this script to be used easily in a pipe including other commands.  If the input is a file, then the option
`-A` can also be used instead of `-o`/`-O` to set the name of the output file automatically.  Try `--help` and
`--long-help` for more details.

## Examples

The following examples assume that you already have a saved game in the file `free-cities-20200401-123456.save`.

To convert a compressed FC game file to a human-readable JSON file:
```
./fc_edit_save.py -i free-cities-20200104-123456.save -p -O free-cities-20200104-123456.json
```

To convert a JSON file to a compressed FC game file:
```
./fc_edit_save.py -I free-cities-20200104-123456.json -o free-cities-20200104-123456.save
```

To display the names and current assignments of all smart slaves (with more than 50 in intelligence):
```
./fc_edit_save.py -i free-cities-20200104-123456.save -p --get-slaves 'intelligence>50' 'name,assignment'
```

To ensure that all your slaves have at least DD-cup boobs and change the hair of Miss Lily at random:
```
./fc_edit_save.py -i free-cities-20200104-123456.save -A --set-slaves all 'boobs=atleast:900' --set-slaves 'Miss Lily' randomhair -v
```
Note that the option `-A` in this example will save the results in the file `free-cities-20200104-123456-cheat.save`.
The option `-v` will show the changes that are applied to all slaves.

For more examples, try `--long-help`.
