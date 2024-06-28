import { createFormContainer ,createTaskElement, createProjectScreen, loadAllProjects,setCurrentProjectId,loadAllTasks} from "./dom.js";
const sidebar_button = document.getElementById("sidebar-toggle");
const sidebar= document.getElementById("sidebar");
sidebar_button.addEventListener("click", function(){
 sidebar.classList.toggle("close");
 
});
const addMoreProjectsButton= document.getElementById("add-more");
const addMoreTasksButton = document.getElementById("add");
window.onload = function(){
    const projects = document.querySelectorAll(".project");
    projects.forEach(function(project){
        project.addEventListener("click",function(){
            setCurrentProjectId(project.dataset.customId);
            loadAllTasks(parseFloat(project.dataset.customId));
        });
    });  
 loadAllProjects();
 loadAllTasks(0);
}
addMoreProjectsButton.addEventListener("click",function(){
    document.body.appendChild(createProjectScreen());
});
addMoreTasksButton.addEventListener("click",function(){
    document.body.appendChild(createFormContainer(null,false));
});