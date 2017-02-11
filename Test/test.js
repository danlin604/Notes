// Writing multiline strings

/* classic */
var multiStr = "This is the first line\n" +
  "This is the second line\n" +
  "This is more...";

/* alternative */
var multiStr = [
  "This is the first line",
  "This is the second line",
  "This is more..."
].join("\n");

