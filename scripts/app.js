require.register("app", function(exports, require, module){
  var addInitialNumbers, checkWin, getMatrix;

$(document).ready(function() {
  var j, k, matrix, x, y;
  for (x = j = 1; j <= 9; x = ++j) {
    $(".grid").append("<div class='mini-grid'></div>");
    for (y = k = 1; k <= 9; y = ++k) {
      $(".grid .mini-grid").last().append("<div class='tile'></div>");
    }
  }
  matrix = [[3, 1, 8, 4, 5, 9, 7, 6, 2], [7, 2, 9, 8, 1, 6, 5, 4, 3], [5, 4, 6, 3, 2, 7, 8, 9, 1], [5, 9, 6, 8, 4, 3, 1, 2, 7], [2, 7, 4, 9, 6, 1, 3, 8, 5], [1, 3, 8, 7, 5, 2, 9, 6, 4], [6, 3, 1, 9, 7, 4, 2, 8, 5], [4, 9, 8, 1, 5, 2, 6, 3, 7], [2, 7, 5, 6, 8, 3, 4, 1, 9]];
  matrix = [[0, 1, 0, 0, 0, 9, 0, 0, 0], [7, 2, 0, 0, 1, 0, 0, 0, 3], [5, 0, 6, 0, 2, 0, 0, 0, 0], [0, 0, 0, 8, 4, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 8, 0], [1, 3, 0, 7, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 5], [4, 9, 0, 0, 0, 2, 0, 3, 7], [0, 7, 0, 0, 8, 3, 0, 0, 9]];
  addInitialNumbers(matrix);
  $(".tile").on("mouseenter", function(e) {
    var $num, $numberSelect, $t, l;
    $t = $(e.currentTarget);
    if ($t.hasClass("filled-in") || $t.hasClass("initial-num")) {
      return $(".number-select-container").off().remove();
    } else if (!($t.children().length || $t.hasClass("filled-in"))) {
      $(".number-select-container").off().remove();
      $numberSelect = $("<div class='number-select-container'></div>");
      for (x = l = 1; l <= 9; x = ++l) {
        $num = $("<div class='number-select' data-num='" + x + "'>" + x + "</div>");
        $num.on("click", function(e) {
          var $tile, num;
          window.e = e;
          e.preventDefault();
          e.stopPropagation();
          $t = $(e.currentTarget);
          $tile = $t.parent().parent();
          num = $t.data("num");
          $tile.addClass("filled-in").text(num);
          if (checkWin(getMatrix())) {
            $(".grid").html("").addClass("complete");
          }
          return $numberSelect.hide();
        });
        $numberSelect.append($num);
      }
      $numberSelect.show();
      return $t.append($numberSelect);
    }
  });
  return $(".tile").on("mousedown", function(e) {
    var $t;
    $t = $(e.currentTarget);
    if ($t.hasClass("initial-num")) {
      return;
    }
    if ($t.hasClass("filled-in")) {
      return $t.text("").removeClass("filled-in").mouseenter();
    }
  });
});

getMatrix = function() {
  var matrix;
  matrix = [];
  $(".grid .mini-grid").each(function(i, grid) {
    matrix.push([]);
    return $(grid).find(".tile").each(function(i, tile) {
      var num;
      num = +$(tile).text();
      return _.last(matrix).push(num || null);
    });
  });
  return matrix;
};

checkWin = function(matrix) {
  var a, b, c, i, j, k, l, len, len1, len2, len3, len4, list, m, n, o, ref, ref1, ref2, ref3, ref4, ref5, ref6;
  ref = [0, 3, 6];
  for (j = 0, len = ref.length; j < len; j++) {
    a = ref[j];
    ref1 = [0, 3, 6];
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      b = ref1[k];
      list = [];
      for (c = l = ref2 = a, ref3 = a + 2; ref2 <= ref3 ? l <= ref3 : l >= ref3; c = ref2 <= ref3 ? ++l : --l) {
        list = list.concat(matrix[c].slice(b, +(b + 2) + 1 || 9e9));
      }
      matrix.push(list);
    }
  }
  ref4 = [0, 1, 2];
  for (m = 0, len2 = ref4.length; m < len2; m++) {
    a = ref4[m];
    ref5 = [0, 1, 2];
    for (n = 0, len3 = ref5.length; n < len3; n++) {
      b = ref5[n];
      list = [];
      ref6 = [0, 3, 6];
      for (o = 0, len4 = ref6.length; o < len4; o++) {
        c = ref6[o];
        list = list.concat((function() {
          var len5, p, ref7, results;
          ref7 = [0, 3, 6];
          results = [];
          for (p = 0, len5 = ref7.length; p < len5; p++) {
            i = ref7[p];
            results.push(matrix[a + c][b + i]);
          }
          return results;
        })());
      }
      matrix.push(list);
    }
  }
  return ((function() {
    var len5, p, results;
    results = [];
    for (p = 0, len5 = matrix.length; p < len5; p++) {
      list = matrix[p];
      if (_.uniq(_.compact(list)).length === 9) {
        results.push(list);
      }
    }
    return results;
  })()).length === 27;
};

addInitialNumbers = function(matrix) {
  return $(".grid .mini-grid").each(function(x, grid) {
    matrix.push([]);
    return $(grid).find(".tile").each(function(y, tile) {
      var num;
      num = matrix[x][y];
      if (num) {
        return $(tile).addClass("initial-num").text(num);
      }
    });
  });
};

  
});

//# sourceMappingURL=app.js.map