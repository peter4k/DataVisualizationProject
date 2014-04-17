/**
 * Created by Peter on 14-4-15.
 */
function getAxisFormat(name){

    var tempformat;
    switch (name){
        case "tuition03_tf":
            tempformat = "$";
            break;
        case "tot_rev_w_auxother_sum":
            tempformat = "$s";
            break;
        default :
            tempformat = "";
    }

    return d3.format(tempformat);
}