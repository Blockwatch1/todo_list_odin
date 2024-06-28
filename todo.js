import {loadAllProjects,loadAllTasks} from "./dom.js";

const getProjects = function(){ 
    if(JSON.parse(localStorage.getItem("SetProjectsOdinTodoList"))===null){
    const proj = [{
    title: "Main",
    id: 0,
    tasks: []
}, {
    title:"Urgent",
    id:1,
    tasks:[]
}];
    
localStorage.setItem("SetProjectsOdinTodoList", JSON.stringify(proj));
const userProjects=JSON.parse(localStorage.getItem("UserProjects"));
if (userProjects!==null){
proj.push(...userProjects);
}
return proj;
    }
    else{
        const proj =JSON.parse(localStorage.getItem("SetProjectsOdinTodoList"));
        const userProjects=JSON.parse(localStorage.getItem("UserProjects"));
        if (userProjects!==null){
        proj.push(...userProjects);
        }
        return proj;
    }

}
const updateUserProjects = function(title){
    const userProjects=JSON.parse(localStorage.getItem("UserProjects"));
    if(userProjects!==null){
    const totalProjects = getProjects();
    const newProject = {
        title,
        id: totalProjects[totalProjects.length-1].id+1,
        tasks:[]
    };
    userProjects.push(newProject);
    localStorage.setItem("UserProjects", JSON.stringify(userProjects));
}else{
    const newProject ={
        title,
        id: 2,
        tasks:[]
    }
    const userProjects = [newProject];
    localStorage.setItem("UserProjects", JSON.stringify(userProjects));
}
    loadAllProjects();
    //domAddProject(newProject);
}
function removeProjectById(id){
    let projects = JSON.parse(localStorage.getItem("UserProjects"));
     projects= projects.filter(function(project,index){
        return String(projects[index].id)!==String(id);
    });
    
     for (let j= id ; j<projects.length;j++){
        projects[i].id-=1;
    }
        
        
    
    localStorage.setItem("UserProjects", JSON.stringify(projects));
    loadAllProjects(projects);
    //loadAllTasks(0);
}
function addTask(projectIndex,task){
    let projects = getProjects();
     let projectsLengthAtIndex = projects[projectIndex].tasks.length;
     task.id = projectsLengthAtIndex;
     //alert("rou7 ntek "+task.id+" "+getProjects()[0].title);
     if(task.urgent&&projectIndex!==1){
     task.urgentId = projects[1].tasks.length;
     projects[1].tasks.push(task);
     }else if(task.urgent){
     task.urgentId = projects[1].tasks.length;
     }
     else{
    task.urgentId =-1;
     }
    projects[projectIndex].tasks.push(task);
    localStorage.setItem("UserProjects", JSON.stringify(projects.slice(2,projects.length)));
    localStorage.setItem("SetProjectsOdinTodoList", JSON.stringify(projects.slice(0,2)));
    loadAllTasks(projectIndex);
}
function deleteTask(projectIndex,task){
    let projects = getProjects();
    if(task.urgent&&projectIndex===1){
        if(task.originProjectIndex!==1){
            projects[task.originProjectIndex].tasks = removeTask(projects[task.originProjectIndex].tasks,task.originProjectIndex,task.urgentId);
        }
        projects[projectIndex].tasks = removeTask(projects[projectIndex].tasks,projectIndex,task.urgentId);
    }else if(task.urgent){
        projects[1].tasks = removeTask(projects[1].tasks,1,task.urgentId);
        projects[projectIndex].tasks = removeTask(projects[projectIndex].tasks,projectIndex,task.id);
    }else{
        projects[projectIndex].tasks = removeTask(projects[projectIndex].tasks,projectIndex,task.id);
    }
    localStorage.setItem("UserProjects", JSON.stringify(projects.slice(2,projects.length)));
    localStorage.setItem("SetProjectsOdinTodoList", JSON.stringify(projects.slice(0,2)));
    loadAllTasks(0);
}
function modifyTask(projectIndex,task){
    let projects = getProjects();
    assignTask(projects,projectIndex,task);
    localStorage.setItem("UserProjects", JSON.stringify(projects.slice(2,projects.length)));
    localStorage.setItem("SetProjectsOdinTodoList", JSON.stringify(projects.slice(0,2)));
    loadAllTasks(projectIndex);
}
function assignTask(projects,projectIndex,task){
    if(projectIndex!==1){
    if (task.urgent&&task.urgentId!==-1){
        let indexOfUrgentTask= getUrgentTaskIndexById(projects[1].tasks, task.urgentId);
        projects[1].tasks[indexOfUrgentTask]= task;
    }
    else if(task.urgent){
        task.urgentId = projects[1].tasks.length;
        projects[1].tasks.push(task);
    }else if(!task.urgent&&task.urgentId!==-1){
        let indexOfUrgentTask= getUrgentTaskIndexById(projects[1].tasks, task.urgentId);
        projects[1].tasks = removeTask(projects[1].tasks,1,task.urgentId);
        task.urgentId=-1;
    }
    let indexToAssign = getTaskIndexById(projects[projectIndex].tasks,task.id);
    projects[projectIndex].tasks[indexToAssign]= task;
    }else{
        let indexOfUrgentTask= getUrgentTaskIndexById(projects[1].tasks, task.urgentId);
        projects[1].tasks[indexOfUrgentTask]= task;
        if(task.originProjectIndex!==1){
        let indexToAssign = getTaskIndexById(projects[task.originProjectIndex].tasks,task.id);
        projects[task.originProjectIndex].tasks[indexToAssign] = task;
        }
    }
}
function removeTask(taskArray , projectId, taskId){
    if(parseFloat(projectId)===1){
        let indexUrgent = getUrgentTaskIndexById(taskArray,taskId);
        taskArray= taskArray.filter(function(task,index){
            return index!==indexUrgent;
        });

       for (let i=indexUrgent;i<taskArray.length;i++){
        taskArray[i].urgentId = parseFloat(taskArray[i].urgentId) - 1;

       } 
    }else{
        let IndexNormal = getTaskIndexById(taskArray,taskId);
        taskArray= taskArray.filter(function(task,index){

            return index!==IndexNormal;
        });
        for (let i=IndexNormal;i<taskArray.length;i++){
            taskArray[i].id = parseFloat(taskArray[i].id) - 1;
           } 

    }
    return taskArray;
}
function getTaskIndexById(taskArray,idToFind){
    for (let i=0 ;i<taskArray.length;i++){
        if(taskArray[i].id===idToFind){
            return i;
        }
     }
     return -1;
}
function getUrgentTaskIndexById(taskArray,idToFind){
 for (let i=0 ;i<taskArray.length;i++){
    if(taskArray[i].urgentId===idToFind){
        return i;
    }
 }
 return -1;
}
function getAllTasks(projectId){
    let projects = getProjects();
    return projects[projectId].tasks;
}
export{updateUserProjects,removeProjectById,getAllTasks,getProjects
    ,addTask,deleteTask,removeTask,modifyTask,getTaskIndexById,getUrgentTaskIndexById};
