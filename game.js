var gamepattern=[];
var clickedpattern=[];
var buttoncolors=["red","blue","green","yellow"];
var start=false;
var level=0;
$(".startbtn").on("click",function()
{
    if(!start)
    {
        $("#level-title").text("level "+level);
        nextseq();
        start=true;
    }    
});
function playsound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
$(".btn").on("click",function(event)
    {
        var chosencolor=$(this).attr("id");
        clickedpattern.push(chosencolor);
        // console.log(clickedpattern);
        playsound(chosencolor);
        animatepress(chosencolor);
        checkans(clickedpattern.length-1);
    });
function nextseq()
{
    clickedpattern=[];
    level++;
    $("#level-title").text("level "+level);
    var randomno=Math.floor(Math.random()*4);
    var randomcolor=buttoncolors[randomno];
    gamepattern.push(randomcolor);
    $("#"+randomcolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomcolor);
}
function animatepress(currentcolor)
{
    $("#"+currentcolor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentcolor).removeClass("pressed");
    },100);
}
function checkans(currlevel)
{
    if(gamepattern[currlevel]===clickedpattern[currlevel])
    {
        console.log("success");
        if(clickedpattern.length===gamepattern.length)
        {
            setTimeout(function()
            {
                nextseq();
            },1000);
        }
    }
    else
    {
        playsound("wrong");
        $("#level-title").text("OOPS! press button to restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },2000);
        console.log("wrong");
        startover();
    }
}
function startover()
{
    level=0;
    gamepattern=[];
    start=false;
}