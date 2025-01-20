import { formatCurrency } from "../scripts/utils/money.js";

if(formatCurrency(2095) === '20.95'){
    console.log(true);
}else{
    console.log(false);
}

if(formatCurrency(0) === '0.00'){
    console.log(true);
}else{
    console.log(false);
}
if(formatCurrency(2000.5) === '20.01'){
    console.log(true);
}else{
    console.log(false);
}
