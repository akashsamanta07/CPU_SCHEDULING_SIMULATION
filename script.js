let tq1=document.getElementById("algorithm");
let preem=document.getElementById("preem");
let tq2=document.getElementById("timequan");
let p1=document.getElementById("p1");
let p2=document.getElementById("p2");


let head=document.getElementById("head");
let gt=document.getElementById("gt");
let gct=document.getElementById("gct");
let table=document.getElementById("table");
let ptable=document.getElementById("ptable");
let p10=document.getElementById("p10");
let parent2=document.getElementById("databody");
let solution=document.getElementById("solution");
let avgtat1=document.getElementById("avgtat");
let avgwt1=document.getElementById("avgwt");
let average1=document.getElementById("average");
let resetbutton=document.getElementById("reset");
const resetanswer=()=>{
    gt.style.display="none";
    head.style.display="none";
    gct.style.display="none";
    table.style.display="none";
    ptable.style.display="none";
    p10.style.display="block";
    parent2.innerHTML="";
    solution.style.display="none";
    average1.style.display="none";
    avgtat1.textContent="";
    avgwt1.textContent="";
    resetbutton.style.display="none";
}
tq1.addEventListener("change",()=>{
    resetanswer();
    let tqvalue=tq1.value;
    if(tqvalue==="rr"){
        tq2.style.display="block";
    }else{
        tq2.style.display="none";
    }
    if(tqvalue==="ps"){
        p1.style.display="block";
        p2.style.display="block";
        preem.style.display="block";
    }else{
        p1.style.display="none";
        p2.style.display="none";
        preem.style.display="none";
    }
});
preem.addEventListener("change",()=>{
    resetanswer();
});
let algobutton=document.getElementById("next");
let firstdiv=document.getElementById("firstdiv2");
let processtable=document.getElementById("processtable");
algobutton.addEventListener("click",()=>{
    algobutton.style.display="none";
    firstdiv.removeAttribute("id");
    processtable.style.display="block";
});

class processes{
    constructor(id,at,bt,p){
        this.id=id;
        this.at=at;
        this.bt=bt;
        this.rt=this.bt;
        this.p=p;
        this.ct=0;
        this.tat=0;
        this.wt=0;
        this.c=0;
    }
}
let process=[];
let add=document.getElementById("add");
let a1=document.getElementById("a1");
let a2=document.getElementById("a2");
let a3=document.getElementById("a3");
let a4=document.getElementById("p2");
add.addEventListener("click",()=>{
    let r=0;
    let e=0;
    let t=0;
    if(a1.value != ""){
        for(let i=0;i<process.length;i++){
            if(parseInt(a1.value)==process[i].id){
                r=1;
            }
        }
    }else{
        r=1;
    }
    if(a2.value != "" && parseInt(a2.value) < 0){
        e=1;
    }
    if(a3.value =="" || parseInt(a3.value) <= 0){
        t=1;
    }
    if(r === 0 && t===0 && e===0){
        resetanswer();
        let b1=parseInt(a1.value);
        let b2=parseInt(a2.value=="" ? 0: a2.value);
        let b3=parseInt(a3.value);
        let b4=parseInt(a4.value=="" ? 0: a4.value);
        process.push(new processes(b1,b2,b3,b4));
        let tr=document.createElement("tr");
        let td1=document.createElement("td");
        let td2=document.createElement("td");
        let td3=document.createElement("td");
        let td4=document.createElement("td");
        td1.textContent=b1;
        td2.textContent=b2;
        td3.textContent=b3;
        td4.textContent=b4;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        let parent=document.getElementById("tem");
        let tqvalue1=tq1.value;
        if(tqvalue1==="ps"){
            tr.appendChild(td4);
            parent.appendChild(tr);
        }else{
            parent.appendChild(tr);
        }
        a1.value="";
        a2.value="";
        a3.value="";
        a4.value="";
    }
    else{
        alert("Invalid input");
    }
});

const tabledata1=()=>{
    for(let i=0;i<process.length;i++){
        let tr=document.createElement("tr");
        let td1=document.createElement("td");
        let td2=document.createElement("td");
        let td3=document.createElement("td");
        let td4=document.createElement("td");
        let td5=document.createElement("td");
        let td6=document.createElement("td");
        td1.textContent=process[i].id;
        td2.textContent=process[i].at;
        td3.textContent=process[i].bt;
        td4.textContent=process[i].ct;
        td5.textContent=process[i].tat;
        td6.textContent=process[i].wt;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        parent2.appendChild(tr);

    }
}
const tabledata2=()=>{
    for(let i=0;i<process.length;i++){
        let tr=document.createElement("tr");
        let td1=document.createElement("td");
        let td2=document.createElement("td");
        let td3=document.createElement("td");
        let td4=document.createElement("td");
        let td5=document.createElement("td");
        let td6=document.createElement("td");
        let td7=document.createElement("td");
        td1.textContent=process[i].id;
        td2.textContent=process[i].at;
        td3.textContent=process[i].bt;
        td4.textContent=process[i].p;
        td5.textContent=process[i].ct;
        td6.textContent=process[i].tat;
        td7.textContent=process[i].wt;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        parent2.appendChild(tr);

    }
}

let gantt=[];
const reset=()=>{
    for(let i=0;i<process.length;i++){
        process[i].rt=process[i].bt;
        process[i].c=0;
        process[i].ct=0;
        process[i].wt=0;
        process[i].tat=0;
    }
};

const fcfs = () => {
    let n = 0;
    let current = 0;
    let avgtat = 0;
    let avgwt = 0;
    process.sort((a,b)=>a.id-b.id);
    gantt=[];
    while (n < process.length) {
        let min = Infinity;
        let mini = -1;
        for (let i = 0; i < process.length; i++) {
            if (min > process[i].at && current >= process[i].at && process[i].c === 0) {
                min = process[i].at;
                mini = i;
            }
        }
        if (mini === -1) {
            current++;  
        } else {
            gantt.push(process[mini].id);
            process[mini].ct = current + process[mini].bt;    
            current = process[mini].ct;                      
            process[mini].tat = process[mini].ct - process[mini].at;  
            process[mini].wt = process[mini].tat - process[mini].bt; 
            process[mini].c = 1;  
            avgtat += process[mini].tat;
            avgwt += process[mini].wt;
            n++;
        }
    }
    tabledata1();
    reset();
    let a=(avgtat / process.length).toFixed(2);
    let b=(avgwt/process.length).toFixed(2);
    avgtat1.textContent="AVERAGE TURNAROUND TIME : "+a;
    avgwt1.textContent= "AVERAGE WAITING TIME : "+b;

};

const sjf = () => {
    let n = 0;
    let current = 0;
    let avgtat = 0;
    let avgwt = 0;
    gantt=[];
    process.sort((a,b)=>a.id-b.id);
    process.sort((a,b)=>a.at-b.at);
    while (n < process.length) {
        let minBt = Infinity;  
        let mini = -1;    
        for (let i = 0; i < process.length; i++) {
            if (minBt > process[i].bt && current >= process[i].at && process[i].c === 0) {
                minBt = process[i].bt;
                mini = i;
            }
        }
        if (mini === -1) {
            current++;
        } else {
            gantt.push(process[mini].id);
            process[mini].ct = current + process[mini].bt;  
            current = process[mini].ct;                      
            process[mini].tat = process[mini].ct - process[mini].at;  
            process[mini].wt = process[mini].tat - process[mini].bt;  
            process[mini].c = 1; 
            avgtat += process[mini].tat;
            avgwt += process[mini].wt;
            n++;  
        }
    }
    process.sort((a,b)=>a.id-b.id);
    tabledata1();
    reset();
    let a=(avgtat / process.length).toFixed(2);
    let b=(avgwt/process.length).toFixed(2);
    avgtat1.textContent="AVERAGE TURNAROUND TIME : "+a;
    avgwt1.textContent= "AVERAGE WAITING TIME : "+b;
};

const srtf = () => {
    process.sort((a,b)=>a.id-b.id);
    process.sort((a, b) => a.at - b.at);
    let currentTime = 0, completed = 0;
    let totalTAT = 0, totalWT = 0;
    let minRT, shortest = -1;
    const n = process.length;
    gantt=[];
    let tem1;
    let tem2=-1;
    while (completed < n) {
        tem1=0;
        minRT = Infinity;
        shortest = -1;
        for (let i = 0; i < n; i++) {
            if (process[i].at <= currentTime && process[i].c === 0 && process[i].rt < minRT && process[i].rt > 0) {
                minRT = process[i].rt;
                shortest = i;
            }
            if(process[i].at <= currentTime){
                tem1++;
            }
        }
        
        if (shortest === -1) {
            currentTime++; 
        } else {

            if (tem2 === -1 || tem2 < tem1 || tem2 === n) {
                if (tem2 === n) {
                    if (gantt[gantt.length - 1] !== process[shortest].id) {
                        gantt.push(process[shortest].id);
                    }
                } else {
                    gantt.push(process[shortest].id);
                }
            }       
            tem2=tem1;
            process[shortest].rt--;  
            currentTime++;            
            if (process[shortest].rt === 0) {
                process[shortest].ct = currentTime;  
                process[shortest].tat = process[shortest].ct - process[shortest].at; 
                process[shortest].wt = process[shortest].tat - process[shortest].bt; 
                process[shortest].c = 1;  
                totalTAT += process[shortest].tat;
                totalWT += process[shortest].wt;
                completed++;
            }
        }
    }
    process.sort((a, b) => a.id - b.id);
    tabledata1();
    reset();
    let a=( totalTAT/ process.length).toFixed(2);
    let b=(totalWT/process.length).toFixed(2);
    avgtat1.textContent="AVERAGE TURNAROUND TIME : "+a;
    avgwt1.textContent= "AVERAGE WAITING TIME : "+b;
};

const rr = () => {
    document.getElementById("timeq").value=((document.getElementById("timeq").value)=="" || document.getElementById("timeq").value=="0") ? 1 : document.getElementById("timeq").value;
    let tq = parseInt(document.getElementById("timeq").value);  
    let currentTime = 0, completed = 0;
    let totalTAT = 0, totalWT = 0;
    const n = process.length;
    let queue = [];
    let i = 0;
    gantt=[];
    process.sort((a,b)=>a.id-b.id);
    process.sort((a, b) => a.at - b.at); 

    while (completed < n) {
        while (i < n && process[i].at <= currentTime) {
            queue.push(process[i]);  
            i++;
        }

        if (queue.length === 0) {
            currentTime++;
            continue;
        }

        let p = queue.shift();  
        gantt.push(p.id);
        if (p.rt > tq) {
            currentTime += tq;
            p.rt -= tq;

            while (i < n && process[i].at <= currentTime) {
                queue.push(process[i]);  
                i++;
            }

            queue.push(p);
        } else {
            currentTime += p.rt;  
            p.rt = 0;
            p.ct = currentTime;
            p.tat = p.ct - p.at;  
            p.wt = p.tat - p.bt;  

            totalTAT += p.tat;
            totalWT += p.wt;

            completed++;  
        }
    }
    process.sort((a, b) => a.id - b.id);
    tabledata1();
    reset();
    let a=( totalTAT/ process.length).toFixed(2);
    let b=(totalWT/process.length).toFixed(2);
    avgtat1.textContent="AVERAGE TURNAROUND TIME : "+a;
    avgwt1.textContent= "AVERAGE WAITING TIME : "+b;
};
const nps = () => {
    process.sort((a,b)=>a.id-b.id);
    process.sort((a, b) => a.at - b.at); 
    let currentTime = 0, completed = 0;
    let totalTAT = 0, totalWT = 0;
    const n = process.length;
    gantt=[];
    while (completed < n) {
        let highestPriority = Infinity;
        let highestIndex = -1;
        for (let i = 0; i < n; i++) {
            if (process[i].at <= currentTime && process[i].c === 0 && process[i].p < highestPriority) {
                highestPriority = process[i].p;
                highestIndex = i;
            }
        }
        if (highestIndex === -1) {
            currentTime++;
        } else {
            gantt.push(process[highestIndex].id);
            let p = process[highestIndex];
            p.ct = currentTime + p.bt;
            currentTime = p.ct;
            p.tat = p.ct - p.at;
            p.wt = p.tat - p.bt;
            p.c = 1;
            totalTAT += p.tat;
            totalWT += p.wt;
            completed++;
        }
    }
    process.sort((a, b) => a.id - b.id);
    tabledata2();
    reset();
    let a=( totalTAT/ process.length).toFixed(2);
    let b=(totalWT/process.length).toFixed(2);
    avgtat1.textContent="AVERAGE TURNAROUND TIME : "+a;
    avgwt1.textContent= "AVERAGE WAITING TIME : "+b;
};
const pps = () => {
    let currentTime = 0, completed = 0;
    let totalTAT = 0, totalWT = 0;
    const n = process.length;
    let tem1;
    let tem2=-1;
    process.sort((a,b)=>a.id-b.id);
    process.sort((a, b) => a.at - b.at);
    while (completed < n) {
        tem1=0;
        let highestPriority = Infinity;
        let highestIndex = -1;
        for (let i = 0; i < n; i++) {
            if (process[i].at <= currentTime && process[i].c === 0 && process[i].p < highestPriority) {
                highestPriority = process[i].p;
                highestIndex = i;
            }
            if(process[i].at <= currentTime){
                tem1++;
            }
        }
        if (highestIndex === -1) {
            currentTime++;
        } else {

            if (tem2 === -1 || tem2 < tem1 || tem2 === n) {
                if (tem2 === n) {
                    if (gantt[gantt.length - 1] !== process[highestIndex].id) {
                        gantt.push(process[highestIndex].id);
                    }
                } else {
                    gantt.push(process[highestIndex].id);
                }
            }       
            tem2=tem1;

            process[highestIndex].rt--; 
            currentTime++;               
            if (process[highestIndex].rt === 0) {
                process[highestIndex].ct = currentTime;  
                process[highestIndex].tat = process[highestIndex].ct - process[highestIndex].at;  
                process[highestIndex].wt = process[highestIndex].tat - process[highestIndex].bt;  
                process[highestIndex].c= 1;  

                totalTAT += process[highestIndex].tat;  
                totalWT += process[highestIndex].wt; 
                completed++; 
            }
        }
    }
    process.sort((a, b) => a.id - b.id);
    tabledata2();
    reset();
    let a=( totalTAT/ process.length).toFixed(2);
    let b=(totalWT/process.length).toFixed(2);
    avgtat1.textContent="AVERAGE TURNAROUND TIME : "+a;
    avgwt1.textContent= "AVERAGE WAITING TIME : "+b;
};
let calculate=document.getElementById("calculate");
calculate.addEventListener("click",()=>{
    resetanswer();
    let tqvalue2=tq1.value;
    if(tqvalue2 != "none"){
        head.style.display="block";
        gt.style.display="block";
    }
    if(tqvalue2=="fcfs"){
        head.textContent="First Come First Served ( Non-Preemtive )";
        fcfs();
    }else if(tqvalue2=="sjf"){
        head.textContent="Shortest Job First ( Non-Preemtive )";
        sjf();
    }else if(tqvalue2=="srtf"){
        head.textContent="Shortest Remaining Time First ( Preemtive )";
        srtf();
    }else if(tqvalue2=="rr"){
        document.getElementById("timeq").value=((document.getElementById("timeq").value)=="" || document.getElementById("timeq").value=="0") ? 1 : document.getElementById("timeq").value;
        head.textContent="Round Robin ( time quantum - "+ document.getElementById("timeq").value+" )";
        rr();
    }else if(tqvalue2=="ps"){
        if(preem.value=="npt"){
            head.textContent="Priority Scheduling ( Non-Preemtive )";
            nps();
        }else{
            head.textContent="Priority Scheduling ( Preemtive )";
            pps();
        }
    }
});
gt.addEventListener("click",()=>{
    gct.style.display="block";
    gt.style.display="none";
    gct.textContent="";
    if(gantt.length==0){
        gct.textContent="No Process";
        resetbutton.style.display="block";
    }else{
        for(let i=0;i<gantt.length-1;i++){
            gct.textContent = gct.textContent+ "P"+gantt[i]+"--";
        }
        gct.textContent=gct.textContent+"P"+gantt[gantt.length-1];
        table.style.display="block";
    }
});

table.addEventListener("click",()=>{
    table.style.display="none";
    ptable.style.display="flex";
    let tqvalue10=tq1.value;
    if(tqvalue10 != "ps"){
        p10.style.display="none";
    }  
    solution.style.display="block"; 
});

solution.addEventListener("click",()=>{
    solution.style.display="none";
    average1.style.display="flex";
    resetbutton.style.display="block";
});


resetbutton.addEventListener("click",()=>{
    location.reload();
});
