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
    //--------------------przejscie z ekranu startowego do gry-------------
    $('.start').on('click', function(event) {
        event.preventDefault();
        $('body').css('background', 'lightblue');
        var nick = $('.nick').val(); // nick gracza
        name.html("Twój nick to:" + ' ' + nick);
        if (nick.length > 2) {
            h3.html('');
            $('.startGame').slideUp();
            game();
        } else {
            h3.html('Zły nick!!!!');
        }

    });
    //-----------------------------Gra------------------------------------
    function game() {
        container.slideDown();
        tableScore.slideDown();
        //-------------------------Pojawianie się przeciwnikow-------------
        function makeInt() {
            var start = setInterval(function() {

                if (count2 > 300) {
                    count2 -= 50; //powiekszanie predkosci pojawiania sie przeciwnikow
                    clearInterval(start);
                    makeInt();
                }

                var myDiv = $('<div class="new-object">'); //nowy przeciwnik
                myDiv.css('width', '40px');
                myDiv.css('height', '40px');
                myDiv.css('background-image', 'url("images/' + Math.ceil(Math.random() * 13) + '.png")');
                var positionTop;
                var positionLeft;
                positionTop = Math.floor(Math.random() * 570);
                positionLeft = Math.floor(Math.random() * 760);

                //---------------------------Losowa pozycja przeciwnikow----------------
                if (Math.floor(Math.random() * 100) % 2 == 0) {
                    if (positionTop < 285) {
                        myDiv.css('left', positionLeft);
                        myDiv.css('top', '0px');
                        $('.container').append(myDiv);
                    } else {
                        myDiv.css('left', positionLeft);
                        myDiv.css('top', '580px');
                        $('.container').append(myDiv);
                    }
                } else {

                    if (positionLeft < 380) {
                        myDiv.css('left', '0px');
                        myDiv.css('top', positionTop);
                        $('.container').append(myDiv);
                    } else {
                        myDiv.css('left', '770px');
                        myDiv.css('top', positionTop);
                        $('.container').append(myDiv);
                    }
                }
                //----------------------animacja dobiegania do wieży-------------------
                myDiv.animate({
                    left: "400px",
                    top: '290px'

                }, count, "linear", function() {
                    if (count > 1000) {
                        count -= 50;
                    }
                });

            }, count2);
            //--------------------Sprawdzam czy przeciwnik wszedł do zamku--------------

            setInterval(function() {
                var enemy = $('.new-object');
                enemy.each(function() {
                    if (enemy.position().left == 400 && enemy.position().top == 290) {
                        count = 999999999999988;
                        count2 = 99999999999988;
                        gameOver.css('display', 'block');
                        container.css('display', 'none');
                        tableScore.css('display', 'none');
                        h4.html(score.text());
                        enemy.remove();
                        $('body').css('background', 'black');
                        add();
                    }
                }, 1);
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
            score.html('Twój wynik to:' + ' ' + scoreCount);
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
    }

    //--------------------zagraj ponownie------------------

    playAgain.on('click', function() {
        window.location.reload();
    });



    //------------------baza danych------------------------


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
