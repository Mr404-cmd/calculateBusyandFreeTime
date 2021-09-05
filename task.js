let meetings = [{
    Id:1,
    meeting: 'Client Call',
    start_time: new Date("2021-09-02T15:45:27.221Z"),
    end_time: new Date("2021-09-02T15:55:27.221Z"),
    blockBefore:new Date("2021-09-02T00:30:00.221Z"),
    blockAfter:new Date("2021-09-02T16:30:00.221Z")
}];
const subtractMinute = (time)=>{
    let hours = new Date(time).getHours();
    let minutes = new Date(time).getMinutes();
    let months = new Date(time).getMonth()+1;
    let years = new Date(time).getFullYear();
    let days = new Date(time).getDate();
    if(minutes > 0){
        minutes -= 1;
    }else{
        if(hours > 0){
            hours -= 1;
        }else{
            return false;
        }
        minutes = 59;
    }
    
    if(hours < 10)
        hours = '0'+hours;
    
    if(minutes < 10)
        minutes = '0'+minutes;
    return new Date(`${years}-${months}-${days} ${hours}:${minutes}:00`)
}

const addMinute = (time)=>{
    let hours = new Date(time).getHours();
    let minutes = new Date(time).getMinutes();
    let months = new Date(time).getMonth()+1;
    let years = new Date(time).getFullYear();
    let days = new Date(time).getDate();
    if(minutes < 59){
        minutes += 1;
    }else{
        if(hours < 22){
            hours += 1;
        }else{
            return false;
        }
        minutes = 0;
    }
    
    if(hours < 10)
        hours = '0'+hours;
    
    if(minutes < 10)
        minutes = '0'+minutes;
    
    return new Date(`${years}-${months}-${days} ${hours}:${minutes}:00`)
}

meetings.sort(function(a, b){
    return a.start_time > b.start_time? 1: -1;
});

let schedule = [];
for(let i=0, l=meetings.length; i<l; i++){
    let start_time = meetings[i].blockBefore;
    let end_time = meetings[i].blockAfter;
    end_time = subtractMinute(meetings[i].start_time);
    
    if(i)
        start_time = addMinute(meetings[i-1].end_time);   
    
    if((end_time && !i) || (end_time && i && meetings[i-1].end_time < meetings[i].start_time))
        schedule.push({meeting: 'free time', start_time: start_time, end_time: end_time});
    
    if(i+1 === l){
        start_time = addMinute(meetings[i].end_time);
        
        if(start_time)
            schedule.push({meeting: 'free time', start_time: start_time, end_time: meetings[i].blockAfter});
    }
}
console.log(schedule);