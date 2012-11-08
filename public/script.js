/**
 * Created with JetBrains WebStorm.
 * User: Technodrive
 * Date: 05.11.12
 * Time: 5:57
 * To change this template use File | Settings | File Templates.
 */

$(function() {
      $("table td").mouseover(
           function(){
              $(this).css({

                "background": "#FFFF22"
              })

                      } )

} )
$(function() {
    $("table td").mouseout(
        function(){
            $(this).css({

                    "background": "#9acd32"
                })

            } )

} )
$(function() {

    $("#table2 td").hover(
        function(){
            var value = $(this).attr('value');



            $.get("/userInform/"+value,function(data){
                $("#content").html(data)
            })
        }
        ,
        function(){

                $("#content").html("")

        }

    )

} )





