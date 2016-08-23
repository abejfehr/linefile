# linefile

Simple file-full-of-single-lines to array converter, includes trimming files and allowing for comments. Perfect for lists.

It has both sync and async methods (same methods, with or without callback).

    npm install linefile

## File example

    # myfile.txt
    these
    are
    # commented
    lines
       and some have
          whitespace

Indentation is ignored in parsing. See [Nesting](#Nesting) if you want it to matter.

## Methods

    const linefile = require('linefile');
    
    // sync
    var myfile = linefile('myfile.txt');
    => ['these', 'are', 'lines', 'and some have', 'whitespace']
    
    // async
    linefile('myfile.txt', function(err, data) {
      if (err) throw err; // same err as from fs.readFile()
      myfile = data;
    });
    
And saving back to file:

    var myfile = ['# comments are just lines', '# with a # in front', 'this is not a comment', '    # whitespace is trimmed in save', '# but it\s fine if you use it', '# before comments also']
    linefile.save('myfile.txt', myfile);
    
# Comments

Comments are just lines with a `#` in front of it.

    # this is a comment

You cannot add a comment to the end of a line.

    some data line # this comment will be included as part of data

But it's fine if it has whitespace in front of it.

              # this is a comment that is indented a lot

# Nesting

Nested arrays (relying on indentation) will come in the next version if I find it necessary. The function is there, but doesn't do anything.

Then

    some
    data
    file
      with
      nested
    arrays
      can
      be
        parsed
          properly
      aaaand
    end

would, after

    // just add in the optional second parameter nested as true
    var array = linefile('filename', true);
    // or
    linefile('filename', true, function(err, data) => {
      array = data;
    });

show up as

    [ 'some'
    , 'data'
    , 'file'
    , [ 'with'
      , 'nested' ]
    , 'arrays'
    , [ 'can'
      , 'be'
      , [ 'parsed'
        , [ 'properly' ]]
      , 'aaaand' ]
    , 'end' ]

I could implement it now, but I don't see the immediate need. If someone wants to do it, send a pull request. See comments in source for how I would want it.

# License

MIT