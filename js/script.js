$(document).ready(function(){
    $('.collapsible .title').click(function(){
        $(this).parents('.collapsible').toggleClass('expanded');
    });
});