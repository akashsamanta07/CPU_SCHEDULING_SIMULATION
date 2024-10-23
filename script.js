const tq1=document.getElementById("algorithm");
const preem=document.getElementById("preem");
const tq2=document.getElementById("timequan");
const tq3=document.getElementById("timeq");
const p2=document.getElementById("p2");
const p3 =document.getElementsByClassName("p3");

const algobutton=document.getElementById("next");
const firstdiv=document.getElementById("firstdiv2");
const processtable=document.getElementById("processtable");

const add=document.getElementById("add");
const a1=document.getElementById("a1");
const a2=document.getElementById("a2");
const a3=document.getElementById("a3");
const a4=document.getElementById("p2");
const parent=document.getElementById("insertprocess");
const ans = document.getElementById("calculate");

const head=document.getElementById("head");
const gt=document.getElementById("gt");
const gct=document.getElementById("gct");
const table=document.getElementById("table");
const ptable=document.getElementById("ptable");
const parent2=document.getElementById("databody");
const solution=document.getElementById("solution");
const avgtat1=document.getElementById("avgtat");
const avgwt1=document.getElementById("avgwt");
const avgrt1=document.getElementById("avgrt");
const average1=document.getElementById("average");
const resetbutton=document.getElementById("reset");

const autoscroll = ()=>{
    window.scrollTo(0,document.body.scrollHeight);
}

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
        this.frt=0;
    }
}
let process=[];
let gantt=[];
const hardReset=()=>{
    gt.style.display="none";
    head.style.display="none";
    gct.style.display="none";
    table.style.display="none";
    ptable.style.display="none";
    parent2.innerHTML="";
    solution.style.display="none";
    average1.style.display="none";
    avgtat1.textContent="";
    avgwt1.textContent="";
    avgrt1.textContent="";
    resetbutton.style.display="none";
    for(let i=0;i<process.length;i++){
        process[i].rt=process[i].bt;
        process[i].c=0;
        process[i].ct=0;
        process[i].wt=0;
        process[i].tat=0;
        process[i].frt=0;
    }
    gantt=[];
}

const tabledata=()=>{
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
        td4.setAttribute("class","p3");
        if(tq1.value != "ps"){
            td4.style.display="none";
        }
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

function calculate(avgtat,avgwt){
    process.sort((a,b)=>a.id-b.id);
    tabledata();
    let a=(avgtat / process.length).toFixed(2);
    let b=(avgwt/process.length).toFixed(2);
    let avgrt=0;
    for(let i=0;i<process.length;i++){
        avgrt = avgrt+ process[i].frt;
    }
    let c=(avgrt/process.length).toFixed(2);
    avgtat1.textContent="AVERAGE TURNAROUND TIME : "+a;
    avgwt1.textContent= "AVERAGE WAITING TIME : "+b;
    avgrt1.textContent= "AVERAGE RESPONSE TIME : "+c;
}

const fcfs = () => {
    let n = 0;
    let current = 0;
    let avgtat = 0;
    let avgwt = 0;
    process.sort((a,b)=>a.id-b.id);
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
            process[mini].frt = current - process[mini].at;
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
    calculate(avgtat,avgwt);
};

const sjf = () => {
    let n = 0;
    let current = 0;
    let avgtat = 0;
    let avgwt = 0;
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
            process[mini].frt = current - process[mini].at;
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
    calculate(avgtat,avgwt);
};

const srtf = () => {
    process.sort((a,b)=>a.id-b.id);
    process.sort((a, b) => a.at - b.at);
    let currentTime = 0, completed = 0;
    let totalTAT = 0, totalWT = 0;
    let minRT, shortest = -1;
    const n = process.length;
    let tem1;
    let tem2=-1;
    let tem=[];
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
            if(tem.length == 0 ){
                process[shortest].frt = currentTime - process[shortest].at;
                tem.push(process[shortest].id);
            }else{
                let k=0;
                for(let i=0;i<tem.length;i++){
                   if( tem[i] === process[shortest].id ){
                     k=1;
                   }
                }
                if(k === 0){
                    process[shortest].frt = currentTime - process[shortest].at;
                    tem.push(process[shortest].id);
                }
            }

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
    calculate(totalTAT,totalWT);
};

const rr = () => {
    let tq = parseInt(document.getElementById("timeq").value);  
    let currentTime = 0, completed = 0;
    let totalTAT = 0, totalWT = 0;
    const n = process.length;
    let queue = [];
    let tem=[];
    let i = 0;
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

        if(tem.length == 0 ){
            p.frt = currentTime - p.at;
            tem.push(p.id);
        }else{
            let k=0;
            for(let i=0;i<tem.length;i++){
               if( tem[i] === p.id ){
                 k=1;
               }
            }
            if(k === 0){
                p.frt = currentTime - p.at;
                tem.push(p.id);
            }
        } 

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
    calculate(totalTAT,totalWT);
};
const nps = () => {
    process.sort((a,b)=>a.id-b.id);
    process.sort((a, b) => a.at - b.at); 
    let currentTime = 0, completed = 0;
    let totalTAT = 0, totalWT = 0;
    const n = process.length;
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
            process[highestIndex].frt = currentTime - process[highestIndex].at;
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
    calculate(totalTAT,totalWT);
};
const pps = () => {
    let currentTime = 0, completed = 0;
    let totalTAT = 0, totalWT = 0;
    const n = process.length;
    let tem=[];
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

            if(tem.length == 0 ){
                process[highestIndex].frt = currentTime - process[highestIndex].at;
                tem.push(process[highestIndex].id);
            }else{
                let k=0;
                for(let i=0;i<tem.length;i++){
                   if( tem[i] === process[highestIndex].id ){
                     k=1;
                   }
                }
                if(k === 0){
                    process[highestIndex].frt = currentTime - process[highestIndex].at;
                    tem.push(process[highestIndex].id);
                }
            }

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
    calculate(totalTAT,totalWT);
};

tq1.addEventListener("change",()=>{
    hardReset();
    let tqvalue=tq1.value;
    if(tqvalue==="rr"){
        tq2.style.display="block";
    }else{
        tq2.style.display="none";
    }
    if(tqvalue==="ps"){
        for(let i=0;i<p3.length;i++){
            p3[i].style.display="block";
        }
        p2.style.display="block";
        preem.style.display="block";
    }else{
        for(let i=0;i<p3.length;i++){
            p3[i].style.display="none";
        }
        p2.style.display="none";
        preem.style.display="none";
    }
    if(tqvalue == "none"){
        alert("Select a algorithm");
    }
});
tq3.addEventListener("change",()=>{
    hardReset();
    if(tq3.value =="" || tq3.value <= 0){
        alert("Enter correct Time Quantum");
    }
});

preem.addEventListener("change",()=>{
    hardReset();
});


algobutton.addEventListener("click",()=>{
    setTimeout(()=>{
    algobutton.style.display="none";
    firstdiv.removeAttribute("id");
    processtable.style.display="block";
    },500);
});

add.addEventListener("click",()=>{
    hardReset();
    if(a1.value != ""){
        for(let i=0;i<process.length;i++){
            if(parseInt(a1.value)==process[i].id){
                alert("Enter correct Process ID");
                return;
            }
        }
    }else{
        alert("Enter correct Process ID");
        return;
    }
    if(a2.value != "" && parseInt(a2.value) < 0){
        alert("Enter correct Arrival Time");
        return;
    }
    if(a3.value =="" || parseInt(a3.value) <= 0){
        alert("Enter correct Burst Time");
        return;
    }
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
    td4.setAttribute("class","p3");
    td1.textContent=b1;
    td2.textContent=b2;
    td3.textContent=b3;
    td4.textContent=b4;
    if(tq1.value != "ps"){
        td4.style.display="none";
    }
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    parent.appendChild(tr);
    a1.value="";
    a2.value="";
    a3.value="";
    a4.value="";
});

ans.addEventListener("click",()=>{
    hardReset();
    let tqvalue2=tq1.value;
    if(tqvalue2 == "none"){
        alert("Select a algorithm");
        return;
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
        if(tq3.value =="" || tq3.value <= 0){
            alert("Enter correct Time Quantum");
            return;
        }else{
            head.textContent="Round Robin ( time quantum - "+ parseInt(tq3.value) +" )";
            tq3.value=parseInt(tq3.value);
            rr();
        }
    }else if(tqvalue2=="ps"){
        if(preem.value=="npt"){
            head.textContent="Priority Scheduling ( Non-Preemtive )";
            nps();
        }else{
            head.textContent="Priority Scheduling ( Preemtive )";
            pps();
        }
    }
    setTimeout(()=>{
        head.style.display="block";
    },500);
    setTimeout(()=>{
        gt.style.display="block";
        autoscroll();
    },1000);
});

gt.addEventListener("click",()=>{
    gt.style.display="none";
    setTimeout(()=>{
        gct.style.display="block";
    },500);
    gct.textContent="";
    if(gantt.length==0){
        gct.textContent="No Process";
        setTimeout(()=>{
            resetbutton.style.display="block";
            autoscroll();
        },1000);
    }else{
        for(let i=0;i<gantt.length-1;i++){
            gct.textContent = gct.textContent+ "P"+gantt[i]+"--";
        }
        gct.textContent=gct.textContent+"P"+gantt[gantt.length-1];
        setTimeout(()=>{
            table.style.display="block";
            autoscroll();
        },1000);
    }
});

table.addEventListener("click",()=>{
    table.style.display="none";
    setTimeout(()=>{
        ptable.style.display="flex";
    },500);
    let tqvalue10=tq1.value;
    if(tqvalue10 != "ps"){
        p10.style.display="none";
    }  
    setTimeout(()=>{
        solution.style.display="block";
        autoscroll();
    },1000);
});

solution.addEventListener("click",()=>{
    solution.style.display="none";
    setTimeout(()=>{
        average1.style.display="flex";
    },500);
    setTimeout(()=>{
        resetbutton.style.display="block";
        autoscroll();
    },1000);
});
resetbutton.addEventListener("click",()=>{
    setTimeout(()=>{
        location.reload();
    },500);
});
