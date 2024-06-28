import {updateUserProjects,removeProjectById,modifyTask,removeTask,getAllTasks,getProjects
,getUrgentTaskIndexById,deleteTask,addTask,getTaskIndexById} from "./todo.js";
let currentProjectId=0;

function createTaskElement(task) {

  const taskDiv = document.createElement('div');
  taskDiv.className = 'task';
  taskDiv.setAttribute('data-custom-id', task.id);
  taskDiv.setAttribute('data-urgent-id',task.urgentId );
  const titleP = document.createElement('p');
  titleP.id = 'title-task';
  taskDiv.appendChild(titleP);
  titleP.textContent= task.title;

  const dateP = document.createElement('p');
  dateP.id = 'date-task';
  taskDiv.appendChild(dateP);
  dateP.textContent= "Due date: "+task.dueDate;
  const descriptionP = document.createElement('p');
  descriptionP.id = 'description-task';
  descriptionP.className = 'only-expand';
  descriptionP.textContent= task.description;
  taskDiv.appendChild(descriptionP);

  const priorityP = document.createElement('p');
  priorityP.id = 'priority-task';
  priorityP.className = 'only-expand';
  taskDiv.appendChild(priorityP);
  let urgent;
  if(task.urgent){
    urgent="Yes";
  }
  else{
    urgent="No";
  }
  priorityP.textContent= "Priority : "+urgent;
 
  const notesP = document.createElement('p');
  notesP.id = 'notes-task';
  notesP.className = 'only-expand';
  taskDiv.appendChild(notesP);
  notesP.textContent= "Notes: "+task.notes;

  const bottomRightDiv = document.createElement('div');
  bottomRightDiv.className = 'bottom-right';
  taskDiv.appendChild(bottomRightDiv);

 
  const button1 = document.createElement('button');
  button1.className = 'svg-inline';
  button1.innerHTML = `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g id="Complete">
              <g id="x-circle">
                  <g>
                      <circle cx="12" cy="12" data-name="--Circle" fill="none" id="_--Circle" r="10" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                      <line fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="14.5" x2="9.5" y1="9.5" y2="14.5"/>                        
                      <line fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="14.5" x2="9.5" y1="14.5" y2="9.5"/>                        
                  </g>                        
              </g>                        
          </g>                        
      </svg>`;
  bottomRightDiv.appendChild(button1);


  const button2 = document.createElement('button');
  button2.className = 'svg-inline';
  button2.innerHTML = `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g id="Complete">
              <g id="edit">
                  <g>
                      <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                      <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                  </g>
              </g>
          </g>
      </svg>`;
  bottomRightDiv.appendChild(button2);

  const button3 = document.createElement('button');
  button3.className = 'svg-inline';
  button3.classList.add("down-arrow");
  button3.innerHTML = `
      <svg class="down-arrow" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g id="Complete">
              <g id="F-Chevron">
                  <polyline fill="none" id="Down" points="5 8.5 12 15.5 19 8.5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
              </g>
          </g>
      </svg>`;
  bottomRightDiv.appendChild(button3);
  button3.addEventListener("click", function(){
    button3.classList.toggle("rotate");
    taskDiv.classList.toggle("expanded");
  });
  button1.addEventListener("click",function(){
    deleteTask(currentProjectId,task);
    taskDiv.remove();
  });
  button2.addEventListener("click",function(){
    document.body.appendChild(createFormContainer(taskDiv,true));
  })
  return taskDiv;
}

function createProjectScreen(){
  const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');
    const form = document.createElement('form');
    form.classList.add('form');
    form.classList.add('title');
    const titleInputLabel = document.createElement('label');
    titleInputLabel.setAttribute('for', 'title');
    titleInputLabel.textContent = 'Title';
    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('id', 'title');
    titleInput.setAttribute('required','');
    const submitButtonDiv = document.createElement('div');
    submitButtonDiv.style.display = 'flex';
    submitButtonDiv.style.alignItems = 'center';
    submitButtonDiv.style.width = '100%';
    submitButtonDiv.style.justifyContent = 'center';
    const submitButton = document.createElement('button');
    submitButton.setAttribute('id', 'submit');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Submit';
    submitButtonDiv.appendChild(submitButton);
    form.appendChild(titleInputLabel);
    form.appendChild(titleInput);
    form.appendChild(submitButtonDiv);
    formContainer.appendChild(form);
    submitButton.addEventListener("click",function(event){
      if (form.checkValidity()) {
        event.preventDefault();
        formContainer.remove();
        updateUserProjects(titleInput.value);
      }
    });
    return formContainer;

}
function createFormContainer(element,modify) {
    let task;
    
    if (currentProjectId===1&&element!==null){
      let tasksArray = getProjects()[currentProjectId].tasks;
      let idToFind = parseFloat(element.dataset.urgentId);
      task = tasksArray[getUrgentTaskIndexById(tasksArray,idToFind)];
    }
    else if(element!==null){
      let tasksArray = getProjects()[currentProjectId].tasks;
      let idToFind = parseFloat(element.dataset.customId);
      task = tasksArray[getTaskIndexById(tasksArray,idToFind)];
    }
    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');
    const form = document.createElement('form');
    form.classList.add('form');
    const titleInputLabel = document.createElement('label');
    titleInputLabel.setAttribute('for', 'title');
    titleInputLabel.textContent = 'Title';
    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('id', 'title');
    titleInput.setAttribute('required', 'true');
    const dateInputLabel = document.createElement('label');
    dateInputLabel.setAttribute('for', 'date');
    dateInputLabel.textContent = 'Due date';
    const dateInput = document.createElement('input');
    dateInput.setAttribute('type', 'date');
    dateInput.setAttribute('id', 'date');
    dateInput.setAttribute('required', 'true');
    const descriptionInputLabel = document.createElement('label');
    descriptionInputLabel.setAttribute('for', 'description');
    descriptionInputLabel.textContent = 'Description';
    const descriptionTextarea = document.createElement('textarea');
    descriptionTextarea.setAttribute('id', 'description');
    descriptionTextarea.setAttribute('cols', '80');
    descriptionTextarea.setAttribute('rows', '10');
    descriptionTextarea.setAttribute('required', 'true');
    const importantCheckboxDiv = document.createElement('div');
    importantCheckboxDiv.style.display = 'flex';
    importantCheckboxDiv.style.alignItems = 'center';
    const importantCheckbox = document.createElement('input');
    importantCheckbox.setAttribute('type', 'checkbox');
    importantCheckbox.setAttribute('id', 'priority');
    if (currentProjectId===1){
      importantCheckbox.setAttribute("checked","");
      importantCheckbox.setAttribute("disabled","");
    }
    const importantLabel = document.createElement('label');
    importantLabel.setAttribute('for', 'priority');
    importantLabel.textContent = 'Urgent';
    const notesInputLabel = document.createElement('label');
    notesInputLabel.setAttribute('for', 'notes');
    notesInputLabel.textContent = 'Notes:';
    const notesInput = document.createElement('input');
    notesInput.setAttribute('type', 'text');
    notesInput.setAttribute('id', 'notes');
    notesInput.setAttribute('required', 'true');
    const submitButtonDiv = document.createElement('div');
    submitButtonDiv.style.display = 'flex';
    submitButtonDiv.style.alignItems = 'center';
    submitButtonDiv.style.width = '100%';
    submitButtonDiv.style.justifyContent = 'center';
    const submitButton = document.createElement('button');
    submitButton.setAttribute('id', 'submit');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Submit';
    form.appendChild(titleInputLabel);
    form.appendChild(titleInput);
    form.appendChild(dateInputLabel);
    form.appendChild(dateInput);
    form.appendChild(descriptionInputLabel);
    form.appendChild(descriptionTextarea);
    importantCheckboxDiv.appendChild(importantCheckbox);
    importantCheckboxDiv.appendChild(importantLabel);
    form.appendChild(importantCheckboxDiv);
    form.appendChild(notesInputLabel);
    form.appendChild(notesInput);
    submitButtonDiv.appendChild(submitButton);
    form.appendChild(submitButtonDiv);
    formContainer.appendChild(form);
    
    if(modify){
      titleInput.value = task.title;
      dateInput.value = task.dueDate;
      descriptionTextarea.value= task.description;
      importantCheckbox.checked = task.urgent;
      notesInput.value = task.notes;
      submitButton.addEventListener("click",function(event){
        if(form.checkValidity()){
        event.preventDefault();
        const newTask = {
          title: titleInput.value,
          dueDate : dateInput.value,
          description: descriptionTextarea.value,
          urgent: importantCheckbox.checked,
          notes: notesInput.value,
          id: parseFloat(element.dataset.customId),
          urgentId: parseFloat(element.dataset.urgentId),
          originProjectIndex: task.originProjectIndex
        }
        formContainer.remove();
        modifyTask(currentProjectId,newTask);
      }
      });
    }
    else{
      submitButton.addEventListener("click",function(event){
        if(form.checkValidity()){
        event.preventDefault();
        const newTask = {
          title: titleInput.value,
          dueDate : dateInput.value,
          description: descriptionTextarea.value,
          urgent: importantCheckbox.checked,
          notes: notesInput.value,
          id: -1,
          urgentId: -1,
          originProjectIndex: currentProjectId
          
        }
        formContainer.remove();
        addTask(currentProjectId,newTask);
      }
      });
    }
    return formContainer;
}
function loadAllProjects(){
  let projects = JSON.parse(localStorage.getItem("UserProjects"));
  if(projects!==null){
  const userProjectsDiv= document.getElementById("user-projects");
  userProjectsDiv.innerHTML="";
  projects.forEach(function(project){
      const button = document.createElement('button');
      button.className = 'project';
      button.setAttribute('data-custom-id', project.id);

      const containerDiv = document.createElement('div');
      containerDiv.className = 'container-row-project';
  
      const outerSpan = document.createElement('span');
      const innerSpan = document.createElement('span');
      outerSpan.style.width= "80%";
      innerSpan.textContent = project.title;
  
      outerSpan.appendChild(innerSpan);
  
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  
      const g1 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const g2 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const g3 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', '12');
      circle.setAttribute('cy', '12');
      circle.setAttribute('data-name', '--Circle');
      circle.setAttribute('fill', 'none');
      circle.setAttribute('id', '_--Circle');
      circle.setAttribute('r', '10');
      circle.setAttribute('stroke-linecap', 'round');
      circle.setAttribute('stroke-linejoin', 'round');
      circle.setAttribute('stroke-width', '2');
  
      const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line1.setAttribute('fill', 'none');
      line1.setAttribute('stroke-linecap', 'round');
      line1.setAttribute('stroke-linejoin', 'round');
      line1.setAttribute('stroke-width', '2');
      line1.setAttribute('x1', '14.5');
      line1.setAttribute('x2', '9.5');
      line1.setAttribute('y1', '9.5');
      line1.setAttribute('y2', '14.5');
  
      const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line2.setAttribute('fill', 'none');
      line2.setAttribute('stroke-linecap', 'round');
      line2.setAttribute('stroke-linejoin', 'round');
      line2.setAttribute('stroke-width', '2');
      line2.setAttribute('x1', '14.5');
      line2.setAttribute('x2', '9.5');
      line2.setAttribute('y1', '14.5');
      line2.setAttribute('y2', '9.5');
  
      g3.appendChild(circle);
      g3.appendChild(line1);
      g3.appendChild(line2);
      g2.appendChild(g3);
      g1.appendChild(g2);
      svg.appendChild(g1);
      
  
      containerDiv.appendChild(outerSpan);
      svg.setAttribute("class", "remove-project");

      containerDiv.appendChild(svg);
      button.appendChild(containerDiv);
      svg.addEventListener("click",function(event){
        button.remove();
        removeProjectById(project.id);
      });
      button.addEventListener("click",function(){
        currentProjectId= parseFloat(button.dataset.customId);
        loadAllTasks(currentProjectId);
      })
  
      userProjectsDiv.appendChild(button);
  });
}
}

function setCurrentProjectId(id){
  currentProjectId=parseFloat(id);
}
function loadAllTasks(projectId){
  const secondRowDisplayed = window.getComputedStyle(document.querySelector(".desktop-only")).display!=="none";
  const rows = document.querySelectorAll(".row");
  let projects= getProjects();
  let projectTasks = projects[projectId].tasks;
  rows.forEach(function(row){
    row.innerHTML="";
  })
  if(secondRowDisplayed){
    for(let i=0;i<projectTasks.length;i++){
      if(i%2==0){
        rows[0].appendChild(createTaskElement(projectTasks[i]));
      }
      else{
        rows[1].appendChild(createTaskElement(projectTasks[i]));
      }
    }
  }else{
    for(let i=0;i<projectTasks.length;i++){
      rows[0].appendChild(createTaskElement(projectTasks[i]));
    }
  }
}
export {createFormContainer,createTaskElement, createProjectScreen,loadAllProjects,setCurrentProjectId,loadAllTasks};
