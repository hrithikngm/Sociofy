// let createPost = function() {
//     let newPost = $('#post_create');
//     $('#post_create').submit(function(event) {
//         event.preventDefault();

//         $.ajax({
//             type: "post",
//             url: '/post/create',
//             data: newPost.serialize(),
//             success: function(data) {
//                 console.log(data); // show response from the php script.
//             },
//             error: function(err) {

//                 console.log(err.responseText);
//             }
//         });
//     });

//     // console.log($('#post_create'));
//     // $.ajax({
//     //     url: '/post/create',
//     //     type: 'POST',
//     //     contentType: 'application/json',
//     //     data: $('#post_create').serialize(),
//     //     success: function(data) {

//     //         console.log("@@@@@@ post create data is below")
//     //         console.log(data);
//     //     },
//     //     error: (err) => {
//     //         console.log("Error in script", err);
//     //     }


//     // });
// }();



$("#post_create").submit(function(e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    // var url = form.attr('action');

    $.ajax({
        type: "POST",
        url: '/post/create',
        data: form.serialize(), // serializes the form's elements.
        success: function(data) {
            let newPost = printpost(data.data.post);
            $('#post-list-container>p').prepend(newPost) // show response from the php script.
        }
    });


});
let printpost = function(post) {
    return $(`<p>
     <h1>
         ${ post.content }

     </h1>
    



   
         <form action="/post/delete" method="POST">
             <input type="hidden" name="post_id" value="${ post.id}">
             <input type="submit" value="Delete">
         </form>
         



             <div>
                 <form action="/comment/create" method="POST">
                     <input type="text" name="content" placeholder="Type comment here..." required>
                     <input type="hidden" name="post" value="${post.id}">
                     <input type="submit" value="Add Comment">
                 </form>

             </div>
             

             </p>`)

}