 process.on("message", function(number){
    let sum = math(number)
    process.send(sum)
    
 })

 const math = (number) => {
    let numerosRandom = [];

    for (let i = 0; i < number; i++) {
        numerosRandom.push(Math.floor(Math.random() * 1000));
    }
  
    return numerosRandom.reduce((a, d) => (a[d] ? (a[d] += 1) : (a[d] = 1), a), {});;
      
 }