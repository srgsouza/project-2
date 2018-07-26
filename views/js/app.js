console.log('2018-06-21');

const $h2 = $('h2');
$h2.text('Here is some new text');

const $li = $('<li/>');
$li.text('Orange');

const $ul = $('ul');

$ul.append($li);
$ul.append('<li>Grape</li>');
$ul.append('<li>Mango</li>');
$ul.append('<li>Banana</li>');


// co$css("background-color", "blue"))
// $(this).css('background-color', 'red');

//  Select the body, append the css
// $('body').css('background-color', 'red');

const $btn = $('#btn');

$btn.on('click', (event) => {
    console.log('Got clicked');
    $('body').append("hi there")
})

const addText = () => {
    $p = $('<p>');
    $p.text("I'm real YO!");
    $('body').append($p);
}

$btn.on('click', addText);


// ######################

const $btn2 = $('#b2');

$btn2.on('click', (event) => {
    // $('body').css('background-color', 'red');
    $('body').toggleClass('addImage');
});


const toggleImage = () => {

}
const $button3 = $('#b3');

$button3.on('click', (event) => {
    $('body').toggleClass('addImage');
})


const $square = $('#square');
$square.on('mouseenter', () => {
    $(square).css('background-color', 'blue');
})