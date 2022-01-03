const hander = require("./index").handler;


test = async ()=>{
    console.log(await hander(null));
}

test();