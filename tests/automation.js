/* -*- Mode: Java; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 4 -*- */
/* vim: set shiftwidth=4 tabstop=4 autoindent cindent expandtab: */

casper.on('remote.message', function(message) {
    this.echo(message);
});

casper.test.begin("unit tests", 2, function(test) {
    casper
    .start("http://localhost:8000/index.html?main=RunTests")
    .waitForText("DONE", function then() {
        test.assertTextExists("DONE: 712 pass", "run unit tests");
    });

    casper
    .thenOpen("http://localhost:8000/index.html?main=tests/isolate/TestIsolate")
    .waitForText("DONE", function then() {
        test.assertTextExists("m\na ma\n\ma\nma\nma\n1 m1\n2 m2\nma\nr mar\nmar\nc marc\nmarc\n");
    });

    casper
    .run(function() {
        test.done();
    });
});
