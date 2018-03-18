$(document).ready(function() {
  //create variables
  $('#modeSelect, #playOptions, #exitGame, #board, #playerSelect, #multiPlayerSelect, #singlePlayerSelect, #whoStarts, #you, #computer, #playerOne, #playerTwo').hide();
  var row1 = ['0', '1', '2'];
  var row2 = ['3', '4', '5'];
  var row3 = ['6', '7', '8'];
  var col1 = ['0', '3', '6'];
  var col2 = ['1', '4', '7'];
  var col3 = ['2', '5', '8'];
  var diag1 = ['0', '4', '8'];
  var diag2 = ['2', '4', '6'];
  var arr = [],
    x, q, z;
  var human = true;
  var computer = true;
  var playerOne = true;
  var playerTwo = true;

  //run a function when a button is clicked
  $('button').on('click', function() {
    //enter the game
    if (this.id === 'enter') {
      $('#modeSelect, #exitGame').show();
      $('#enterGame').hide();
    }
    //show single player options
    else if (this.id === 'singlePlayer') {
      q = 0;
      human = true;
      computer = true;
      playerOne = false;
      playerTwo = false;
      $('#playerSelect, #singlePlayerSelect, #restartSinglePlayer').show();
      $('#modeSelect, #restartMultiPlayer').hide();
      singlePlayer();
    }
    //show multiplayer options
    else if (this.id === 'multiPlayer') {
      q = 1;
      human = false;
      computer = false;
      playerOne = true;
      playerTwo = true;
      $('#playerSelect, #multiPlayerSelect, #restartMultiPlayer').show();
      $('#modeSelect, #restartSinglePlayer').hide();
      multiPlayer();
    }
    //player one is X
    else if (this.id === 'X') {
      x = 1;
      $('#playerSelect').hide();
      if (q === 0) {
        $('#singlePlayerSelect').hide();
        $('#whoStarts, #you, #computer').show();
      } else {
        $('#multiPlayerSelect').hide();
        $('#whoStarts, #playerOne, #playerTwo').show();
      }
    }
    //player one is O
    else if (this.id === 'O') {
      x = 0;
      $('#playerSelect').hide();
      if (q === 0) {
        $('#singlePlayerSelect').hide();
        $('#whoStarts, #you, #computer').show();
      } else {
        $('#multiPlayerSelect').hide();
        $('#whoStarts, #playerOne, #playerTwo').show();
      }
    }
    //return to player select
    else if (this.id === 'newGame') {
      $('#board, #playOptions').hide();
      $('#playerSelect').show();
      if (q === 0) {
        $('#singlePlayerSelect').show();
      } else {
        $('#multiPlayerSelect').show();
      }
    }
    //return to mode select
    else if (this.id === 'reset') {
      human = false;
      computer = false;
      playerOne = false;
      playerTwo = false;
      $('#board, #playOptions').hide();
      $('#modeSelect').show();
    }
    //exit the game
    else if (this.id === 'exit') {
      $('#reset').trigger('click');
      $('#modeSelect, #playOptions, #exitGame, #board, #playerSelect, #multiPlayerSelect, #singlePlayerSelect, #whoStarts, #you, #computer, #playerOne, #playerTwo').hide();
      $('#enterGame').show();
    }
  });

  function singlePlayer() {
    //run a function when a button is clicked
    $('button').on('click', function() {
      //human starts the game
      if (this.id === 'you') {
        $('#whoStarts, #you, #computer').hide();
        $('#board, #playOptions').show();
        z = 0;
        computer = false;
        humanStarts();
        $('#restartSinglePlayer').trigger('click');
      }
      //computer starts the game
      else if (this.id === 'computer') {
        $('#whoStarts, #you, #computer').hide();
        $('#board, #playOptions').show();
        z = 1;
        human = false;
        computerStarts();
        $('#restartSinglePlayer').trigger('click');
      }
      //game restarts
      else if (this.id === 'restartSinglePlayer') {
        human = true;
        computer = true;
        $('a').removeAttr('style');
        $('a').children().html('');
        $('#result').html('');
        $('#whosTurnSinglePlayer').html('your turn').show();
        $('#whosTurnMultiPlayer').hide();
        arr = [];
        if (z === 0) {
          computer = false;
          humanStarts();
        } else {
          human = false;
          computerStarts();
        }
      }
    });

    //mark X  or O on click, then proceed to computer's turn
    function humanStarts() {
      $('a').on('click', function() {
        if (human) {
          if (!$(this).children().html()) {
            if (x === 0) {
              $(this).children().html('O');
              arr.push('O');
              getResult();
              human = false;
              computer = true;
              computerStarts();
            } else {
              $(this).children().html('X');
              arr.push('X');
              getResult();
              human = false;
              computer = true;
              computerStarts();
            }
          }
        }
      });
    }

    //mark X or O on click, then proceed to human's turn
    function computerStarts() {
      var y = Math.floor(Math.random() * 9);
      if (computer) {
        if (x === 1) {
          //if the array is empty, mark either the corner or the central square
          if (arr.length === 0) {
            if ((y === 0) || (y === 2) || (y === 4) || (y === 6) || (y === 8)) {
              $('#' + y).children().html('O');
              arr.push('O');
              getResult();
              human = true;
              computer = false;
              humanStarts();
            } else {
              computerStarts();
            }
          } else {
            //if a winning position is present, win the game
            if (($('#r1c1').html() === '') && (($('#r1c2').html() === 'O' && $('#r1c3').html() === 'O') || ($('#r2c1').html() === 'O' && $('#r3c1').html() === 'O') || ($('#r2c2').html() === 'O' && $('#r3c3').html() === 'O'))) {
              $('#r1c1').html('O');
              arr.push('O');
              getResult();
              human = true;
              computer = false;
              humanStarts();
            } else if (($('#r1c2').html() === '') && (($('#r1c1').html() === 'O' && $('#r1c3').html() === 'O') || ($('#r2c2').html() === 'O' && $('#r3c2').html() === 'O'))) {
              $('#r1c2').html('O');
              arr.push('O');
              getResult();
              human = true;
              computer = false;
              humanStarts();
            } else if (($('#r1c3').html() === '') && (($('#r1c1').html() === 'O' && $('#r1c2').html() === 'O') || ($('#r2c3').html() === 'O' && $('#r3c3').html() === 'O') || ($('#r2c2').html() === 'O' && $('#r3c1').html() === 'O'))) {
              $('#r1c3').html('O');
              arr.push('O');
              getResult();
              human = true;
              computer = false;
              humanStarts();
            } else if (($('#r2c1').html() === '') && (($('#r1c1').html() === 'O' && $('#r3c1').html() === 'O') || ($('#r2c2').html() === 'O' && $('#r2c3').html() === 'O'))) {
              $('#r2c1').html('O');
              arr.push('O');
              getResult();
              human = true;
              computer = false;
              humanStarts();
            } else if (($('#r2c2').html() === '') && (($('#r1c2').html() === 'O' && $('#r3c2').html() === 'O') || ($('#r2c1').html() === 'O' && $('#r2c3').html() === 'O') || ($('#r1c1').html() === 'O' && $('#r3c3').html() === 'O') || ($('#r1c3').html() === 'O' && $('#r3c1').html() === 'O'))) {
              $('#r2c2').html('O');
              arr.push('O');
              getResult();
              human = true;
              computer = false;
              humanStarts();
            } else if (($('#r2c3').html() === '') && (($('#r1c3').html() === 'O' && $('#r3c3').html() === 'O') || ($('#r2c1').html() === 'O' && $('#r2c2').html() === 'O'))) {
              $('#r2c3').html('O');
              arr.push('O');
              getResult();
              human = true;
              computer = false;
              humanStarts();
            } else if (($('#r3c1').html() === '') && (($('#r1c1').html() === 'O' && $('#r2c1').html() === 'O') || ($('#r3c2').html() === 'O' && $('#r3c3').html() === 'O') || ($('#r1c3').html() === 'O' && $('#r2c2').html() === 'O'))) {
              $('#r3c1').html('O');
              arr.push('O');
              getResult();
              human = true;
              computer = false;
              humanStarts();
            } else if (($('#r3c2').html() === '') && (($('#r3c1').html() === 'O' && $('#r3c3').html() === 'O') || ($('#r1c2').html() === 'O' && $('#r2c2').html() === 'O'))) {
              $('#r3c2').html('O');
              arr.push('O');
              getResult();
              human = true;
              computer = false;
              humanStarts();
            } else if (($('#r3c3').html() === '') && (($('#r3c1').html() === 'O' && $('#r3c2').html() === 'O') || ($('#r1c3').html() === 'O' && $('#r2c3').html() === 'O') || ($('#r1c1').html() === 'O' && $('#r2c2').html() === 'O'))) {
              $('#r3c3').html('O');
              arr.push('O');
              getResult();
              human = true;
              computer = false;
              humanStarts();
            } else {
              //if a winning threat is present, prevent the human from winning
              if (($('#r1c1').html() === '') && (($('#r1c2').html() === 'X' && $('#r1c3').html() === 'X') || ($('#r2c1').html() === 'X' && $('#r3c1').html() === 'X') || ($('#r2c2').html() === 'X' && $('#r3c3').html() === 'X'))) {
                $('#r1c1').html('O');
                arr.push('O');
                getResult();
                human = true;
                computer = false;
                humanStarts();
              } else if (($('#r1c2').html() === '') && (($('#r1c1').html() === 'X' && $('#r1c3').html() === 'X') || ($('#r2c2').html() === 'X' && $('#r3c2').html() === 'X'))) {
                $('#r1c2').html('O');
                arr.push('O');
                getResult();
                human = true;
                computer = false;
                humanStarts();
              } else if (($('#r1c3').html() === '') && (($('#r1c1').html() === 'X' && $('#r1c2').html() === 'X') || ($('#r2c3').html() === 'X' && $('#r3c3').html() === 'X') || ($('#r2c2').html() === 'X' && $('#r3c1').html() === 'X'))) {
                $('#r1c3').html('O');
                arr.push('O');
                getResult();
                human = true;
                computer = false;
                humanStarts();
              } else if (($('#r2c1').html() === '') && (($('#r1c1').html() === 'X' && $('#r3c1').html() === 'X') || ($('#r2c2').html() === 'X' && $('#r2c3').html() === 'X'))) {
                $('#r2c1').html('O');
                arr.push('O');
                getResult();
                human = true;
                computer = false;
                humanStarts();
              } else if (($('#r2c2').html() === '') && (($('#r1c2').html() === 'X' && $('#r3c2').html() === 'X') || ($('#r2c1').html() === 'X' && $('#r2c3').html() === 'X') || ($('#r1c1').html() === 'X' && $('#r3c3').html() === 'X') || ($('#r1c3').html() === 'X' && $('#r3c1').html() === 'X'))) {
                $('#r2c2').html('O');
                arr.push('O');
                getResult();
                human = true;
                computer = false;
                humanStarts();
              } else if (($('#r2c3').html() === '') && (($('#r1c3').html() === 'X' && $('#r3c3').html() === 'X') || ($('#r2c1').html() === 'X' && $('#r2c2').html() === 'X'))) {
                $('#r2c3').html('O');
                arr.push('O');
                getResult();
                human = true;
                computer = false;
                humanStarts();
              } else if (($('#r3c1').html() === '') && (($('#r1c1').html() === 'X' && $('#r2c1').html() === 'X') || ($('#r3c2').html() === 'X' && $('#r3c3').html() === 'X') || ($('#r1c3').html() === 'X' && $('#r2c2').html() === 'X'))) {
                $('#r3c1').html('O');
                arr.push('O');
                getResult();
                human = true;
                computer = false;
                humanStarts();
              } else if (($('#r3c2').html() === '') && (($('#r3c1').html() === 'X' && $('#r3c3').html() === 'X') || ($('#r1c2').html() === 'X' && $('#r2c2').html() === 'X'))) {
                $('#r3c2').html('O');
                arr.push('O');
                getResult();
                human = true;
                computer = false;
                humanStarts();
              } else if (($('#r3c3').html() === '') && (($('#r3c1').html() === 'X' && $('#r3c2').html() === 'X') || ($('#r1c3').html() === 'X' && $('#r2c3').html() === 'X') || ($('#r1c1').html() === 'X' && $('#r2c2').html() === 'X'))) {
                $('#r3c3').html('O');
                arr.push('O');
                getResult();
                human = true;
                computer = false;
                humanStarts();
              } else {
                //if the central square is empty mark it
                if ($('#4').children().html() === '') {
                  $('#4').children().html('O');
                  arr.push('O');
                  getResult();
                  human = true;
                  computer = false;
                  humanStarts();
                } else {
                  //if the central square is marked by the computer and one of the corner squares marked by the human, mark any square except those around the marked corner square
                  if (($('#r2c2').html() === 'O') && ($('#r1c1').html() === 'X')) {
                    if (((y === 5) || (y === 7) || (y === 8)) && ($('#' + y).children().html() === '')) {
                      $('#' + y).children().html('O');
                      arr.push('O');
                      getResult();
                      human = true;
                      computer = false;
                      humanStarts();
                    } else {
                      computerStarts();
                    }
                  } else if (($('#r2c2').html() === 'O') && ($('#r1c3').html() === 'X')) {
                    if (((y === 3) || (y === 6) || (y === 7)) && ($('#' + y).children().html() === '')) {
                      $('#' + y).children().html('O');
                      arr.push('O');
                      getResult();
                      human = true;
                      computer = false;
                      humanStarts();
                    } else {
                      computerStarts();
                    }
                  } else if (($('#r2c2').html() === 'O') && ($('#r3c1').html() === 'X')) {
                    if (((y === 1) || (y === 2) || (y === 5)) && ($('#' + y).children().html() === '')) {
                      $('#' + y).children().html('O');
                      arr.push('O');
                      getResult();
                      human = true;
                      computer = false;
                      humanStarts();
                    } else {
                      computerStarts();
                    }
                  } else if (($('#r2c2').html() === 'O') && ($('#r3c3').html() === 'X')) {
                    if (((y === 0) || (y === 1) || (y === 3)) && ($('#' + y).children().html() === '')) {
                      $('#' + y).children().html('O');
                      arr.push('O');
                      getResult();
                      human = true;
                      computer = false;
                      humanStarts();
                    } else {
                      computerStarts();
                    }
                  } else {
                    //if a corner is empty, mark it otherwise mark any random square
                    if (($('#0').children().html() === '') || ($('#2').children().html() === '') || ($('#6').children().html() === '') || ($('#8').children().html() === '')) {
                      if (((y === 0) || (y === 2) || (y === 6) || (y === 8)) && ($('#' + y).children().html() === '')) {
                        $('#' + y).children().html('O');
                        arr.push('O');
                        getResult();
                        human = true;
                        computer = false;
                        humanStarts();
                      } else {
                        computerStarts();
                      }
                    } else {
                      if ($('#' + y).children().html() === '') {
                        $('#' + y).children().html('O');
                        arr.push('O');
                        getResult();
                        human = true;
                        computer = false;
                        humanStarts();
                      } else {
                        computerStarts();
                      }
                    }
                  }
                }
              }
            }
          }
        } else {
          if (arr.length === 0) {
            if ((y === 0) || (y === 2) || (y === 4) || (y === 6) || (y === 8)) {
              $('#' + y).children().html('X');
              arr.push('X');
              getResult();
              human = true;
              computer = false;
              humanStarts();
            } else {
              computerStarts();
            }
          } else {
            if (($('#r1c1').html() === '') && (($('#r1c2').html() === 'X' && $('#r1c3').html() === 'X') || ($('#r2c1').html() === 'X' && $('#r3c1').html() === 'X') || ($('#r2c2').html() === 'X' && $('#r3c3').html() === 'X'))) {
              $('#r1c1').html('X');
              arr.push('X');
              getResult();
              human = true;
              computer = false;
              humanStarts();
            } else if (($('#r1c2').html() === '') && (($('#r1c1').html() === 'X' && $('#r1c3').html() === 'X') || ($('#r2c2').html() === 'X' && $('#r3c2').html() === 'X'))) {
              $('#r1c2').html('X');
              arr.push('X');
              getResult();
              human = true;
              computer = false;
              humanStarts();
            } else if (($('#r1c3').html() === '') && (($('#r1c1').html() === 'X' && $('#r1c2').html() === 'X') || ($('#r2c3').html() === 'X' && $('#r3c3').html() === 'X') || ($('#r2c2').html() === 'X' && $('#r3c1').html() === 'X'))) {
              $('#r1c3').html('X');
              arr.push('X');
              getResult();
              human = true;
              computer = false;
              humanStarts();
            } else if (($('#r2c1').html() === '') && (($('#r1c1').html() === 'X' && $('#r3c1').html() === 'X') || ($('#r2c2').html() === 'X' && $('#r2c3').html() === 'X'))) {
              $('#r2c1').html('X');
              arr.push('X');
              getResult();
              human = true;
              computer = false;
              humanStarts();
            } else if (($('#r2c2').html() === '') && (($('#r1c2').html() === 'X' && $('#r3c2').html() === 'X') || ($('#r2c1').html() === 'X' && $('#r2c3').html() === 'X') || ($('#r1c1').html() === 'X' && $('#r3c3').html() === 'X') || ($('#r1c3').html() === 'X' && $('#r3c1').html() === 'X'))) {
              $('#r2c2').html('X');
              arr.push('X');
              getResult();
              human = true;
              computer = false;
              humanStarts();
            } else if (($('#r2c3').html() === '') && (($('#r1c3').html() === 'X' && $('#r3c3').html() === 'X') || ($('#r2c1').html() === 'X' && $('#r2c2').html() === 'X'))) {
              $('#r2c3').html('X');
              arr.push('X');
              getResult();
              human = true;
              computer = false;
              humanStarts();
            } else if (($('#r3c1').html() === '') && (($('#r1c1').html() === 'X' && $('#r2c1').html() === 'X') || ($('#r3c2').html() === 'X' && $('#r3c3').html() === 'X') || ($('#r1c3').html() === 'X' && $('#r2c2').html() === 'X'))) {
              $('#r3c1').html('X');
              arr.push('X');
              getResult();
              human = true;
              computer = false;
              humanStarts();
            } else if (($('#r3c2').html() === '') && (($('#r3c1').html() === 'X' && $('#r3c3').html() === 'X') || ($('#r1c2').html() === 'X' && $('#r2c2').html() === 'X'))) {
              $('#r3c2').html('X');
              arr.push('X');
              getResult();
              human = true;
              computer = false;
              humanStarts();
            } else if (($('#r3c3').html() === '') && (($('#r3c1').html() === 'X' && $('#r3c2').html() === 'X') || ($('#r1c3').html() === 'X' && $('#r2c3').html() === 'X') || ($('#r1c1').html() === 'X' && $('#r2c2').html() === 'X'))) {
              $('#r3c3').html('X');
              arr.push('X');
              getResult();
              human = true;
              computer = false;
              humanStarts();
            } else {
              if (($('#r1c1').html() === '') && (($('#r1c2').html() === 'O' && $('#r1c3').html() === 'O') || ($('#r2c1').html() === 'O' && $('#r3c1').html() === 'O') || ($('#r2c2').html() === 'O' && $('#r3c3').html() === 'O'))) {
                $('#r1c1').html('X');
                arr.push('X');
                getResult();
                human = true;
                computer = false;
                humanStarts();
              } else if (($('#r1c2').html() === '') && (($('#r1c1').html() === 'O' && $('#r1c3').html() === 'O') || ($('#r2c2').html() === 'O' && $('#r3c2').html() === 'O'))) {
                $('#r1c2').html('X');
                arr.push('X');
                getResult();
                human = true;
                computer = false;
                humanStarts();
              } else if (($('#r1c3').html() === '') && (($('#r1c1').html() === 'O' && $('#r1c2').html() === 'O') || ($('#r2c3').html() === 'O' && $('#r3c3').html() === 'O') || ($('#r2c2').html() === 'O' && $('#r3c1').html() === 'O'))) {
                $('#r1c3').html('X');
                arr.push('X');
                getResult();
                human = true;
                computer = false;
                humanStarts();
              } else if (($('#r2c1').html() === '') && (($('#r1c1').html() === 'O' && $('#r3c1').html() === 'O') || ($('#r2c2').html() === 'O' && $('#r2c3').html() === 'O'))) {
                $('#r2c1').html('X');
                arr.push('X');
                getResult();
                human = true;
                computer = false;
                humanStarts();
              } else if (($('#r2c2').html() === '') && (($('#r1c2').html() === 'O' && $('#r3c2').html() === 'O') || ($('#r2c1').html() === 'O' && $('#r2c3').html() === 'O') || ($('#r1c1').html() === 'O' && $('#r3c3').html() === 'O') || ($('#r1c3').html() === 'O' && $('#r3c1').html() === 'O'))) {
                $('#r2c2').html('X');
                arr.push('X');
                getResult();
                human = true;
                computer = false;
                humanStarts();
              } else if (($('#r2c3').html() === '') && (($('#r1c3').html() === 'O' && $('#r3c3').html() === 'O') || ($('#r2c1').html() === 'O' && $('#r2c2').html() === 'O'))) {
                $('#r2c3').html('X');
                arr.push('X');
                getResult();
                human = true;
                computer = false;
                humanStarts();
              } else if (($('#r3c1').html() === '') && (($('#r1c1').html() === 'O' && $('#r2c1').html() === 'O') || ($('#r3c2').html() === 'O' && $('#r3c3').html() === 'O') || ($('#r1c3').html() === 'O' && $('#r2c2').html() === 'O'))) {
                $('#r3c1').html('X');
                arr.push('X');
                getResult();
                human = true;
                computer = false;
                humanStarts();
              } else if (($('#r3c2').html() === '') && (($('#r3c1').html() === 'O' && $('#r3c3').html() === 'O') || ($('#r1c2').html() === 'O' && $('#r2c2').html() === 'O'))) {
                $('#r3c2').html('X');
                arr.push('X');
                getResult();
                human = true;
                computer = false;
                humanStarts();
              } else if (($('#r3c3').html() === '') && (($('#r3c1').html() === 'O' && $('#r3c2').html() === 'O') || ($('#r1c3').html() === 'O' && $('#r2c3').html() === 'O') || ($('#r1c1').html() === 'O' && $('#r2c2').html() === 'O'))) {
                $('#r3c3').html('X');
                arr.push('X');
                getResult();
                human = true;
                computer = false;
                humanStarts();
              } else {
                if ($('#4').children().html() === '') {
                  $('#4').children().html('X');
                  arr.push('X');
                  getResult();
                  human = true;
                  computer = false;
                  humanStarts();
                } else {
                  //if the central square is marked by the computer and one of the corner squares marked by the human, mark any square except those around the marked corner square
                  if (($('#r2c2').html() === 'X') && ($('#r1c1').html() === 'O')) {
                    if (((y === 5) || (y === 7) || (y === 8)) && ($('#' + y).children().html() === '')) {
                      $('#' + y).children().html('X');
                      arr.push('X');
                      getResult();
                      human = true;
                      computer = false;
                      humanStarts();
                    } else {
                      computerStarts();
                    }
                  } else if (($('#r2c2').html() === 'X') && ($('#r1c3').html() === 'O')) {
                    if (((y === 3) || (y === 6) || (y === 7)) && ($('#' + y).children().html() === '')) {
                      $('#' + y).children().html('X');
                      arr.push('X');
                      getResult();
                      human = true;
                      computer = false;
                      humanStarts();
                    } else {
                      computerStarts();
                    }
                  } else if (($('#r2c2').html() === 'X') && ($('#r3c1').html() === 'O')) {
                    if (((y === 1) || (y === 2) || (y === 5)) && ($('#' + y).children().html() === '')) {
                      $('#' + y).children().html('X');
                      arr.push('X');
                      getResult();
                      human = true;
                      computer = false;
                      humanStarts();
                    } else {
                      computerStarts();
                    }
                  } else if (($('#r2c2').html() === 'X') && ($('#r3c3').html() === 'O')) {
                    if (((y === 0) || (y === 1) || (y === 3)) && ($('#' + y).children().html() === '')) {
                      $('#' + y).children().html('X');
                      arr.push('X');
                      getResult();
                      human = true;
                      computer = false;
                      humanStarts();
                    } else {
                      computerStarts();
                    }
                  } else {
                    if (($('#0').children().html() === '') || ($('#2').children().html() === '') || ($('#6').children().html() === '') || ($('#8').children().html() === '')) {
                      if (((y === 0) || (y === 2) || (y === 6) || (y === 8)) && ($('#' + y).children().html() === '')) {
                        $('#' + y).children().html('X');
                        arr.push('X');
                        getResult();
                        human = true;
                        computer = false;
                        humanStarts();
                      } else {
                        computerStarts();
                      }
                    } else {
                      if ($('#' + y).children().html() === '') {
                        $('#' + y).children().html('X');
                        arr.push('X');
                        getResult();
                        human = true;
                        computer = false;
                        humanStarts();
                      } else {
                        computerStarts();
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  function multiPlayer() {
    //run a function when a button is clicked
    $('button').on('click', function() {
      //player one starts the game
      if (this.id === 'playerOne') {
        $('#whoStarts, #playerOne, #playerTwo').hide();
        $('#board, #playOptions').show();
        z = 0;
        playerTwo = false;
        playerOneStarts();
        $('#restartMultiPlayer').trigger('click');
      }
      //player two starts the game
      else if (this.id === 'playerTwo') {
        $('#whoStarts, #playerOne, #playerTwo').hide();
        $('#board, #playOptions').show();
        z = 1;
        playerOne = false;
        playerTwoStarts();
        $('#restartMultiPlayer').trigger('click');
      }
      //restart the game
      else if (this.id === 'restartMultiPlayer') {
        playerOne = true;
        playerTwo = true;
        $('a').removeAttr('style');
        $('a').children().html('');
        $('#result').html('');
        $('#whosTurnSinglePlayer').hide();
        arr = [];
        if (z === 0) {
          playerTwo = false;
          playerOneStarts();
          $('#whosTurnMultiPlayer').html("player one's turn").show();
        } else {
          playerOne = false;
          playerTwoStarts();
          $('#whosTurnMultiPlayer').html("player two's turn").show();
        }
      }
    });

    ////mark X  or O on click, then proceed to player two's turn
    function playerOneStarts() {
      $('a').on('click', function() {
        $('#whosTurnMultiPlayer').html("player two's turn");
        if (playerOne) {
          if (!$(this).children().html()) {
            if (x === 0) {
              $(this).children().html('O');
              arr.push('O');
              getResult();
              playerOne = false;
              playerTwo = true;
              playerTwoStarts();
            } else {
              $(this).children().html('X');
              arr.push('X');
              getResult();
              playerOne = false;
              playerTwo = true;
              playerTwoStarts();
            }
          }
        }
      });
    }

    //mark X  or O on click, then proceed to player one's turn
    function playerTwoStarts() {
      $('a').on('click', function() {
        $('#whosTurnMultiPlayer').html("player one's turn");
        if (playerTwo) {
          if (!$(this).children().html()) {
            if (x === 0) {
              $(this).children().html('X');
              arr.push('X');
              getResult();
              playerTwo = false;
              playerOne = true;
              playerOneStarts();
            } else {
              $(this).children().html('O');
              arr.push('O');
              getResult();
              playerTwo = false;
              playerOne = true;
              playerOneStarts();
            }
          }
        }
      });
    }
  }

  //check if there is a winner or a draw
  function getResult() {
    var a = row1.every(function(val) {
      return $('#' + val).children().html() !== '';
    });
    var b = row2.every(function(val) {
      return $('#' + val).children().html() !== '';
    });
    var c = row3.every(function(val) {
      return $('#' + val).children().html() !== '';
    });
    var d = col1.every(function(val) {
      return $('#' + val).children().html() !== '';
    });
    var e = col2.every(function(val) {
      return $('#' + val).children().html() !== '';
    });
    var f = col3.every(function(val) {
      return $('#' + val).children().html() !== '';
    });
    var g = diag1.every(function(val) {
      return $('#' + val).children().html() !== '';
    });
    var h = diag2.every(function(val) {
      return $('#' + val).children().html() !== '';
    });
    //disable the game if there is a winner or a draw
    function gameOver() {
      human = false;
      computer = false;
      playerOne = false;
      playerTwo = false;
      $('h3').hide();
    }
    //if three squares in a row, column or diagonal are occupied by the same marking, there is a winner
    if (a && ($('#r1c1').html() === $('#r1c2').html()) && ($('#r1c1').html() === $('#r1c3').html()) && ($('#r1c2').html() === $('#r1c3').html())) {
      row1.map(function(val) {
        return $('#' + val).css('backgroundColor', 'red');
      });
      gameOver();
      if (q === 0) {
        if (x === 1) {
          if ($('#r1c1').html() === 'X') {
            $('#result').html('YOU WIN').css('color', 'green');
          } else {
            $('#result').html('YOU LOSE').css('color', 'red');
          }
        } else {
          if ($('#r1c1').html() === 'O') {
            $('#result').html('YOU WIN').css('color', 'green');
          } else {
            $('#result').html('YOU LOSE').css('color', 'red');
          }
        }
      } else {
        if (x === 1) {
          if ($('#r1c1').html() === 'X') {
            $('#result').html('PLAYER ONE WINS').css('color', 'aqua');
          } else {
            $('#result').html('PLAYER TWO WINS').css('color', 'aqua');
          }
        } else {
          if ($('#r1c1').html() === 'O') {
            $('#result').html('PLAYER ONE WINS').css('color', 'aqua');
          } else {
            $('#result').html('PLAYER TWO WINS').css('color', 'aqua');
          }
        }
      }
    } else if (b && ($('#r2c1').html() === $('#r2c2').html()) && ($('#r2c1').html() === $('#r2c3').html()) && ($('#r2c2').html() === $('#r2c3').html())) {
      row2.map(function(val) {
        return $('#' + val).css('backgroundColor', 'red');
      });
      gameOver();
      if (q === 0) {
        if (x === 1) {
          if ($('#r2c1').html() === 'X') {
            $('#result').html('YOU WIN').css('color', 'green');
          } else {
            $('#result').html('YOU LOSE').css('color', 'red');
          }
        } else {
          if ($('#r2c1').html() === 'O') {
            $('#result').html('YOU WIN').css('color', 'green');
          } else {
            $('#result').html('YOU LOSE').css('color', 'red');
          }
        }
      } else {
        if (x === 1) {
          if ($('#r2c1').html() === 'X') {
            $('#result').html('PLAYER ONE WINS').css('color', 'aqua');
          } else {
            $('#result').html('PLAYER TWO WINS').css('color', 'aqua');
          }
        } else {
          if ($('#r2c1').html() === 'O') {
            $('#result').html('PLAYER ONE WINS').css('color', 'aqua');
          } else {
            $('#result').html('PLAYER TWO WINS').css('color', 'aqua');
          }
        }
      }
    } else if (c && ($('#r3c1').html() === $('#r3c2').html()) && ($('#r3c1').html() === $('#r3c3').html()) && ($('#r3c2').html() === $('#r3c3').html())) {
      row3.map(function(val) {
        return $('#' + val).css('backgroundColor', 'red');
      });
      gameOver();
      if (q === 0) {
        if (x === 1) {
          if ($('#r3c1').html() === 'X') {
            $('#result').html('YOU WIN').css('color', 'green');
          } else {
            $('#result').html('YOU LOSE').css('color', 'red');
          }
        } else {
          if ($('#r3c1').html() === 'O') {
            $('#result').html('YOU WIN').css('color', 'green');
          } else {
            $('#result').html('YOU LOSE').css('color', 'red');
          }
        }
      } else {
        if (x === 1) {
          if ($('#r3c1').html() === 'X') {
            $('#result').html('PLAYER ONE WINS').css('color', 'aqua');
          } else {
            $('#result').html('PLAYER TWO WINS').css('color', 'aqua');
          }
        } else {
          if ($('#r3c1').html() === 'O') {
            $('#result').html('PLAYER ONE WINS').css('color', 'aqua');
          } else {
            $('#result').html('PLAYER TWO WINS').css('color', 'aqua');
          }
        }
      }
    } else if (d && ($('#r1c1').html() === $('#r2c1').html()) && ($('#r1c1').html() === $('#r3c1').html()) && ($('#r2c1').html() === $('#r3c1').html())) {
      col1.map(function(val) {
        return $('#' + val).css('backgroundColor', 'red');
      });
      gameOver();
      if (q === 0) {
        if (x === 1) {
          if ($('#r1c1').html() === 'X') {
            $('#result').html('YOU WIN').css('color', 'green');
          } else {
            $('#result').html('YOU LOSE').css('color', 'red');
          }
        } else {
          if ($('#r1c1').html() === 'O') {
            $('#result').html('YOU WIN').css('color', 'green');
          } else {
            $('#result').html('YOU LOSE').css('color', 'red');
          }
        }
      } else {
        if (x === 1) {
          if ($('#r1c1').html() === 'X') {
            $('#result').html('PLAYER ONE WINS').css('color', 'aqua');
          } else {
            $('#result').html('PLAYER TWO WINS').css('color', 'aqua');
          }
        } else {
          if ($('#r1c1').html() === 'O') {
            $('#result').html('PLAYER ONE WINS').css('color', 'aqua');
          } else {
            $('#result').html('PLAYER TWO WINS').css('color', 'aqua');
          }
        }
      }
    } else if (e && ($('#r1c2').html() === $('#r2c2').html()) && ($('#r1c2').html() === $('#r3c2').html()) && ($('#r2c2').html() === $('#r3c2').html())) {
      col2.map(function(val) {
        return $('#' + val).css('backgroundColor', 'red');
      });
      gameOver();
      if (q === 0) {
        if (x === 1) {
          if ($('#r1c2').html() === 'X') {
            $('#result').html('YOU WIN').css('color', 'green');
          } else {
            $('#result').html('YOU LOSE').css('color', 'red');
          }
        } else {
          if ($('#r1c2').html() === 'O') {
            $('#result').html('YOU WIN').css('color', 'green');
          } else {
            $('#result').html('YOU LOSE').css('color', 'red');
          }
        }
      } else {
        if (x === 1) {
          if ($('#r1c2').html() === 'X') {
            $('#result').html('PLAYER ONE WINS').css('color', 'aqua');
          } else {
            $('#result').html('PLAYER TWO WINS').css('color', 'aqua');
          }
        } else {
          if ($('#r1c2').html() === 'O') {
            $('#result').html('PLAYER ONE WINS').css('color', 'aqua');
          } else {
            $('#result').html('PLAYER TWO WINS').css('color', 'aqua');
          }
        }
      }
    } else if (f && ($('#r1c3').html() === $('#r2c3').html()) && ($('#r1c3').html() === $('#r3c3').html()) && ($('#r2c3').html() === $('#r3c3').html())) {
      col3.map(function(val) {
        return $('#' + val).css('backgroundColor', 'red');
      });
      gameOver();
      if (q === 0) {
        if (x === 1) {
          if ($('#r1c3').html() === 'X') {
            $('#result').html('YOU WIN').css('color', 'green');
          } else {
            $('#result').html('YOU LOSE').css('color', 'red');
          }
        } else {
          if ($('#r1c3').html() === 'O') {
            $('#result').html('YOU WIN').css('color', 'green');
          } else {
            $('#result').html('YOU LOSE').css('color', 'red');
          }
        }
      } else {
        if (x === 1) {
          if ($('#r1c3').html() === 'X') {
            $('#result').html('PLAYER ONE WINS').css('color', 'aqua');
          } else {
            $('#result').html('PLAYER TWO WINS').css('color', 'aqua');
          }
        } else {
          if ($('#r1c3').html() === 'O') {
            $('#result').html('PLAYER ONE WINS').css('color', 'aqua');
          } else {
            $('#result').html('PLAYER TWO WINS').css('color', 'aqua');
          }
        }
      }
    } else if (g && ($('#r1c1').html() === $('#r2c2').html()) && ($('#r1c1').html() === $('#r3c3').html()) && ($('#r2c2').html() === $('#r3c3').html())) {
      diag1.map(function(val) {
        return $('#' + val).css('backgroundColor', 'red');
      });
      gameOver();
      if (q === 0) {
        if (x === 1) {
          if ($('#r2c2').html() === 'X') {
            $('#result').html('YOU WIN').css('color', 'green');
          } else {
            $('#result').html('YOU LOSE').css('color', 'red');
          }
        } else {
          if ($('#r2c2').html() === 'O') {
            $('#result').html('YOU WIN').css('color', 'green');
          } else {
            $('#result').html('YOU LOSE').css('color', 'red');
          }
        }
      } else {
        if (x === 1) {
          if ($('#r2c2').html() === 'X') {
            $('#result').html('PLAYER ONE WINS').css('color', 'aqua');
          } else {
            $('#result').html('PLAYER TWO WINS').css('color', 'aqua');
          }
        } else {
          if ($('#r2c2').html() === 'O') {
            $('#result').html('PLAYER ONE WINS').css('color', 'aqua');
          } else {
            $('#result').html('PLAYER TWO WINS').css('color', 'aqua');
          }
        }
      }
    } else if (h && ($('#r1c3').html() === $('#r2c2').html()) && ($('#r1c3').html() === $('#r3c1').html()) && ($('#r2c2').html() === $('#r3c1').html())) {
      diag2.map(function(val) {
        return $('#' + val).css('backgroundColor', 'red');
      });
      gameOver();
      if (q === 0) {
        if (x === 1) {
          if ($('#r2c2').html() === 'X') {
            $('#result').html('YOU WIN').css('color', 'green');
          } else {
            $('#result').html('YOU LOSE').css('color', 'red');
          }
        } else {
          if ($('#r2c2').html() === 'O') {
            $('#result').html('YOU WIN').css('color', 'green');
          } else {
            $('#result').html('YOU LOSE').css('color', 'red');
          }
        }
      } else {
        if (x === 1) {
          if ($('#r2c2').html() === 'X') {
            $('#result').html('PLAYER ONE WINS').css('color', 'aqua');
          } else {
            $('#result').html('PLAYER TWO WINS').css('color', 'aqua');
          }
        } else {
          if ($('#r2c2').html() === 'O') {
            $('#result').html('PLAYER ONE WINS').css('color', 'aqua');
          } else {
            $('#result').html('PLAYER TWO WINS').css('color', 'aqua');
          }
        }
      }
    }
    //if there is no winner and all squares are full, it is a draw
    else if ((arr.length === 9)) {
      gameOver();
      $('#result').html('DRAW').css('color', 'purple');
    }
  }

});
