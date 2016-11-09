$(function() {
    var container = $('.container'); //mapa
    var tableScore = $('.yourScore'); //wynik
    var count = 10000; //szybkosc startowa dobiegania do zamku
    var count2 = 2000; //szybkosc startowa pojawiania sie przeciwnikow
    var scoreCount = 0; //licznik pkt'ow
    var name = $('.name'); //nick
    var score = $('.score'); //pkt'y
    var h3 = $('h3');
    var gameOver = $('.gameOver');
    var playAgain = $('.playAgain');
    var h4 = $('h4');
    var array = [];
    var autor = $('.authorDiv');
    var instruction = $('.instructionDiv');
    var startGame = $('.startGame');


    var windowHei = $(document).innerHeight();
    var contHei = container.height();
    var scoreHei = tableScore.height();
    startGame.css('height', windowHei - 66 + 'px');
    gameOver.css('height', windowHei - 17 + 'px');
    var marginCont = ((windowHei - contHei) / 2) - 12 + 'px';
    container.css('margin-top', marginCont);
    var marginScore = ((windowHei - scoreHei) / 2) - 120 + 'px';
    tableScore.css('margin-top', marginScore);

    var margin1 = $('.margin1');
    var margin2 = $('.margin2');
    var contWid = container.innerWidth();
    var windowWid = $(document).innerWidth();
    var marginWid = ((windowWid - contWid) / 2) - 22.5 + 'px';
    margin1.css('width', marginWid);
    margin2.css('width', marginWid);

    //----------------------audio----------------------------------
    var startAudio = $('#startAudio');
    var gameAudio = $('#gameAudio');
    var shot = $('#shot');
    var game_over = $('#game_over');
    var startOn = $('.startOn');
    var startOff = $('.startOff');
    var gameMusicOn = $('.gameMusicOn');
    var gameMusicOff = $('.gameMusicOff');


    function play(audio) {
        audio[0].play();
    }

    function pause(audio) {
        audio[0].pause();
    }
    startOff.css('display', 'none');
    startOn.on('click', function(event) {
        event.preventDefault();
        $(this).css('display', 'none');
        startOff.css('display', 'inline-block');
        clearInterval(sound1);
        pause(startAudio);
    });
    startOff.on('click', function(event) {
        event.preventDefault();
        $(this).css('display', 'none');
        startOn.css('display', 'inline-block');
        play(startAudio);
        sound1 = setInterval(function() {
            play(startAudio);
        });
    });
    //---------------------muzyka na start---------------------------------
    var sound1 = setInterval(function() {
        play(startAudio);
    });
    //--------------------przejscie z ekranu startowego do gry-------------
    $('.start').on('click', function(event) {
        event.preventDefault();
        var nick = $('.nick').val(); // nick gracza
        name.html(nick);
        if (nick.length > 2) {
            $('body').css('background', 'lightblue');
            h3.html('');
            $('.startGame').css('display', 'none');
            game();
            clearInterval(sound1);
            pause(startAudio);
        } else {
            h3.html('Zły nick!!!!');
        }

    });
    //-----------------------autor---------------------------------------
    $('.author').on('click', function(event) {
        event.preventDefault();
        h3.html('');
        if (autor.css('display') == 'block') {
            autor.css('display', 'none');
            instruction.css('display', 'none');
            $('form').css('padding-top', '252px');
        } else {
            instruction.css('display', 'none');
            autor.css('display', 'block');
            $('form').css('padding-top', '10px');
        }
    });
    $('.instruction').on('click', function(event) {
        event.preventDefault();
        h3.html('');
        if (instruction.css('display') == 'block') {
            autor.css('display', 'none');
            instruction.css('display', 'none');
            $('form').css('padding-top', '252px');
        } else {
            instruction.css('display', 'block');
            autor.css('display', 'none');
            $('form').css('padding-top', '10px');
        }
    });
    //-----------------------------Gra------------------------------------
    function game() {
        $('.game').css('display', 'block');
        var sound2 = setInterval(function() {
            play(gameAudio);
        });
        gameMusicOff.css('display', 'none');
        gameMusicOn.on('click', function(event) {
            event.preventDefault();
            $(this).css('display', 'none');
            gameMusicOff.css('display', 'inline-block');
            clearInterval(sound2);
            pause(gameAudio);
        });
        gameMusicOff.on('click', function(event) {
            event.preventDefault();
            $(this).css('display', 'none');
            gameMusicOn.css('display', 'inline-block');
            sound2 = setInterval(function() {
                play(gameAudio);
            });
        });
        //-------------------------Pojawianie się przeciwnikow-------------
        function makeInt() {
            var start = setInterval(function() {

                if (count2 > 300) {
                    count2 -= 50; //powiekszanie predkosci pojawiania sie przeciwnikow
                    clearInterval(start);
                    makeInt();
                }
                var x = Math.floor(Math.random() * 100) % 4;
                if (x != 0) {
                    var myDiv = $('<div class="new-object">'); //nowy przeciwnik
                    myDiv.css('width', '40px');
                    myDiv.css('height', '40px');
                    myDiv.css('background-image', 'url("images/' + Math.ceil(Math.random() * 13) + '.png")');
                } else {
                    var minion = $('<div class="minion">');
                    minion.css('width', '40px');
                    minion.css('height', '40px');
                    minion.css('background-image', 'url("images/minion' + Math.ceil(Math.random() * 3) + '.png")');
                }
                var positionTop;
                var positionLeft;
                positionTop = Math.floor(Math.random() * 570);
                positionLeft = Math.floor(Math.random() * 760);

                //---------------------------Losowa pozycja przeciwnikow----------------
                if (Math.floor(Math.random() * 100) % 2 == 0) {
                    if (positionTop < 285) {
                        if (x != 0) {
                            myDiv.css('left', positionLeft);
                            myDiv.css('top', '0px');
                            $('.container').append(myDiv);
                        } else {
                            minion.css('left', positionLeft);
                            minion.css('top', '0px');
                            $('.container').append(minion);
                        }
                    } else {
                        if (x != 0) {
                            myDiv.css('left', positionLeft);
                            myDiv.css('top', '580px');
                            $('.container').append(myDiv);
                        } else {
                            minion.css('left', positionLeft);
                            minion.css('top', '580px');
                            $('.container').append(minion);
                        }
                    }
                } else {

                    if (positionLeft < 380) {
                        if (x != 0) {
                            myDiv.css('left', '0px');
                            myDiv.css('top', positionTop);
                            $('.container').append(myDiv);
                        } else {
                            minion.css('left', '0px');
                            minion.css('top', positionTop);
                            $('.container').append(minion);
                        }
                    } else {
                        if (x != 0) {
                            myDiv.css('left', '770px');
                            myDiv.css('top', positionTop);
                            $('.container').append(myDiv);
                        } else {
                            minion.css('left', '770px');
                            minion.css('top', positionTop);
                            $('.container').append(minion);
                        }
                    }
                }
                //----------------------animacja dobiegania do wieży-------------------
                if (x != 0) {
                    myDiv.animate({
                        left: "400px",
                        top: '290px'

                    }, count, "linear", function() {
                        if (count > 1000) {
                            count -= 50;
                        }
                    });
                } else {
                    minion.animate({
                        left: "400px",
                        top: '290px'

                    }, count, "linear", function() {
                        if (count > 1000) {
                            count -= 50;
                            minion.remove();
                        }
                    });
                }
            }, count2);
            //--------------------Sprawdzam czy przeciwnik wszedł do zamku--------------

            setInterval(function() {
                var enemy = $('.new-object');
                enemy.each(function() {
                        if ($(this).position().left == 400 && $(this).position().top == 290) {
                            gameOver.css('display', 'block');
                            $('.game').css('display', 'none');
                            count = 999999999999988;
                            count2 = 99999999999988;
                            clearInterval(sound2);
                            pause(gameAudio);
                            play(game_over);
                            h4.html('Twój wynik to:' + ' ' + score.text());
                            $('body').css('background', 'black');
                            add();
                        }
                    },
                    600,
                    function() {
                        enemy.remove();
                    });
            });
        }

        makeInt();
        //------------------------BOMBA----------------------------
        var bomb = $('.bomb');

        function comeBack() {
            bomb.css('left', '405px');
            bomb.css('top', '295px');
        }


        //------------------------USUWANIE DIVA-----------------
        container.on('click', 'div.new-object', function(event) {
            var thisDiv = $(this);
            var bombTop = thisDiv.position().top;
            var bombLeft = thisDiv.position().left;
            scoreCount++;
            if (gameMusicOff.css('display') == 'none') {
                play(shot);
            }
            score.html(scoreCount);
            bomb.animate({
                top: bombTop,
                left: bombLeft
            }, 100, function() {
                comeBack();
                thisDiv.remove();
                var death = $('<div class="death">');
                death.css('left', bombLeft);
                death.css('top', bombTop);
                container.append(death);
                setTimeout(function() {
                    death.remove()
                }, 2000);
            });
        });
        container.on('click', '.minion', function(event) {
            var thisMinion = $(this);
            var bombTop = thisMinion.position().top;
            var bombLeft = thisMinion.position().left;
            scoreCount--;
            if (gameMusicOff.css('display') == 'none') {
                play(shot);
            }
            score.html(scoreCount);
            bomb.animate({
                top: bombTop,
                left: bombLeft
            }, 100, function() {
                comeBack();
                thisMinion.remove();
                var death = $('<div class="death">');
                death.css('left', bombLeft);
                death.css('top', bombTop);
                container.append(death);
                setTimeout(function() {
                    death.remove()
                }, 2000);
            });
        });
    }

    //--------------------zagraj ponownie------------------

    playAgain.on('click', function() {
        window.location.reload();
    });



    //------------------baza danych------------------------
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCHP6WAcJ6mgjBS9QAsgJ_kSDYMTBDN9y8",
        authDomain: "nexusdefender-cd8f2.firebaseapp.com",
        databaseURL: "https://nexusdefender-cd8f2.firebaseio.com",
        storageBucket: "nexusdefender-cd8f2.appspot.com",
        messagingSenderId: "435267209363"
    };
    firebase.initializeApp(config);

    function add() {
        firebase
            .database()
            .ref('array') //odwołujemy się do konkretnego klucza
            .once('value', function(event) {
                array = event.val() || [];
                array.push({
                    name: $('.nick').val(),
                    score: scoreCount
                });

                function SortByScore(a, b) {
                    var aName = a.score;
                    var bName = b.score;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                array.sort(SortByScore);
                for (var i = 1; i < 11; i++) {
                    var tr = $('<tr>');
                    var td1 = $('<td>');
                    var td2 = $('<td>');
                    var td3 = $('<td>');
                    td1.html(i + '.');
                    td2.html(array[array.length - i]['name']);
                    td3.html(array[array.length - i]['score']);
                    tr.append(td1, td2, td3);
                    $('.table').append(tr);
                }
                firebase
                    .database()
                    .ref('array')
                    .set(array);
            });

        //This will sort your array



    }


});
