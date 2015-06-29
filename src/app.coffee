$(document).ready ->

  for x in [1..9]
    $(".grid").append("<div class='mini-grid'></div>")
    for y in [1..9]
      $(".grid .mini-grid").last().append("<div class='tile'></div>")

  # test to check validation
  matrix = [
    [3,1,8,4,5,9,7,6,2],
    [7,2,9,8,1,6,5,4,3],
    [5,4,6,3,2,7,8,9,1],
    [5,9,6,8,4,3,1,2,7],
    [2,7,4,9,6,1,3,8,5],
    [1,3,8,7,5,2,9,6,4],
    [6,3,1,9,7,4,2,8,5],
    [4,9,8,1,5,2,6,3,7],
    [2,7,5,6,8,3,4,1,9],
  ]
  matrix = [
    [0,1,0,0,0,9,0,0,0],
    [7,2,0,0,1,0,0,0,3],
    [5,0,6,0,2,0,0,0,0],
    [0,0,0,8,4,0,0,0,0],
    [0,0,0,0,0,0,0,8,0],
    [1,3,0,7,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,5],
    [4,9,0,0,0,2,0,3,7],
    [0,7,0,0,8,3,0,0,9],
  ]
  addInitialNumbers(matrix)

  $(".tile").on "mouseenter", (e)->
    $t = $(e.currentTarget)
    if $t.hasClass("filled-in") or $t.hasClass("initial-num")
      $(".number-select-container").off().remove()
    else if not ($t.children().length or $t.hasClass("filled-in"))
      $(".number-select-container").off().remove()
      $numberSelect = $("<div class='number-select-container'></div>")
      for x in [1..9]
        $num = $("<div class='number-select' data-num='#{x}'>#{x}</div>")
        $num.on "click", (e)->
          window.e = e
          e.preventDefault()
          e.stopPropagation()
          $t = $(e.currentTarget)
          $tile = $t.parent().parent()
          num = $t.data("num")
          $tile.addClass("filled-in").text(num)
          if checkWin(getMatrix())
            $(".grid").html("").addClass("complete")
          $numberSelect.hide()
        $numberSelect.append($num)
      $numberSelect.show()
      $t.append($numberSelect)

  $(".tile").on "mousedown", (e)->
    $t = $(e.currentTarget)
    return if $t.hasClass("initial-num")
    if $t.hasClass("filled-in")
      $t.text("").removeClass("filled-in").mouseenter()

getMatrix = ->
  matrix = []
  $(".grid .mini-grid").each (i, grid)->
    matrix.push([])
    $(grid).find(".tile").each (i, tile)->
      num = +$(tile).text()
      _.last(matrix).push(num or null)
  matrix

checkWin = (matrix)->
  for a in [0,3,6]
    for b in [0,3,6]
      list = []
      for c in [a..a+2]
        list = list.concat(matrix[c][b..b+2])
      matrix.push(list)

  for a in [0,1,2]
    for b in [0,1,2]
      list = []
      for c in [0,3,6]
        list = list.concat((matrix[a+c][b+i] for i in  [0,3,6]))
      matrix.push(list)

  (list for list in matrix when _.uniq(_.compact(list)).length is 9).length is 27

addInitialNumbers = (matrix)->
  $(".grid .mini-grid").each (x, grid)->
    matrix.push([])
    $(grid).find(".tile").each (y, tile)->
      num = matrix[x][y]
      if num
        $(tile).addClass("initial-num").text(num)


