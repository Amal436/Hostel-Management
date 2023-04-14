export const formattedDate = (days)=>{
var currentDate = new Date();
// Subtract 7 days from current date
var DaysAgo = new Date();
DaysAgo.setDate(currentDate.getDate() - days);

// Format the date as yyyy-mm-dd
var year = DaysAgo.getFullYear();
var month = String(DaysAgo.getMonth() + 1).padStart(2, '0');
var day = String(DaysAgo.getDate()).padStart(2, '0');
var formattedDate = year + '-' + month + '-' + day;
return formattedDate;
}