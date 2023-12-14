
// function sayHello(){
//     console.log("hello");
// }

// function sayGoodbye(initialGreetingFunction){
//     initialGreetingFunction();
//     console.log("goodbye");
// }

// sayGoodbye(sayHello);

let steps = ["this is step 1", "this is step 2", "this is step 3", "this is step 4"];

function announceError(erroneousIndex){
    console.log(`sorry, you searched for step ${erroneousIndex} but there is no such step`);
}


// function getStep(index, callback, errorHandler){
//     if (!steps[index]){
//         errorHandler(index + 1);
//     }
//     else {
//         console.log(steps[index]);
//         callback();
//     }
// }



// getStep(0, ()=>{
//     getStep(1, ()=>{
//         getStep(2, ()=>{
//             getStep(3, ()=>{
//                 getStep(4, ()=>{
//                     console.log("did it work?");
//                 }, announceError);
//             }, announceError);
//         }, announceError)
//     }, announceError );
// }, announceError);


function getStepWithPromise(index) {
    return new Promise (function (resolve, reject) {
      setTimeout(() => {
          
          if (!steps[index]) reject(index+1)
          else {  
            console.log( steps[index] );
            resolve();
        }     
      }, Math.random() * 2000); 
    });
  };


//   getStepWithPromise(3).then(()=>{
//       getStepWithPromise(4).then(()=>{
//         console.log("success!")
//       }).catch((err)=>{
//         announceError(err);
//       })
//     })





    // const p1 = new Promise((resolve, reject) => {
    //     setTimeout(() => resolve("foo"), Math.random() * 3000);
    //   });

       
    //   const p2 = new Promise((resolve, reject) => {
    //     setTimeout(() => reject("bar"), Math.random() * 1000);
    //   });

       
    //   const p3 = new Promise((resolve, reject) => {
    //     setTimeout(() => reject("blahhahah"), Math.random() * 3000);
    //   });

      

       
    //   Promise.all( [p1, p2, p3] )
    //     .then((values) => console.log("all of them are done", values))
    //     .catch((err)=>{console.log("failing operations:", err)});


    function getStepWithAsync(index) {
        return new Promise (function (resolve, reject) {
          setTimeout(() => {
              
              if (!steps[index]) reject(index+1)
              else {  
                console.log( steps[index] );
                resolve();
            }     
          }, Math.random() * 2000); 
        });
      };


      async function giveFive(){
        setTimeout(()=>{
            console.log("5")
            return "someValue";
        }, Math.random() * 2000)
      }

      
      async function getAllStepsInOrder(){
        try{
            await giveFive();
            await getStepWithAsync(0);
            await getStepWithAsync(1);
            await getStepWithAsync(2);
            await getStepWithAsync(3);
        } catch(err) {
            console.log(`sorry, there is no step ${err}`);
        }

      }

      getAllStepsInOrder();