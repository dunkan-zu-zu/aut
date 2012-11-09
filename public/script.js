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
            $(this).css({"cursor":"pointer"})
            var serialis=$(this).serializeArray();

            $.get("/userInform/"+value+"?"+serialis,function(data){
                $("#content").html(data)
            })
        }
        ,
        function(){

                $("#content").html("")

        }

    )

} )

$(function() {

    $("#table2 td").click(
        function(){
            var value = $(this).attr('value');
             location="/user/"+value;
        })})


$(function(){
    $("#button_Reg").click(
        function(){
            var param=$("#form_Reg").serialize();
            $.post("/reg?"+param,function(data){
                $("#form_Reg").html(data)
            })
        }
    )
})

$(
    function(){
        $(".heder_td").click(
            function(){
                var value=$(this).attr("value");
                location=value;
            }
        )
    }
)


$(
    function(){
        $("#exit_and_reg").ready(
            function(){
                $.get("/exit_and_reg",function(data){
                    $("#exit_and_reg").html(data[0])
                    $("#exit_and_reg").attr("value",data[1])

                })
            }
        )
    }
)


$(
    function(){
        $(".heder_td").hover(
            function(){
                $(this).css({"cursor":"pointer"})
            }
        )
    }
)