window.TaskManager = (() => {
  let module = {};
   
  module.Task = class Task {
    constructor(name = 'untitled', duration = 0, tags = null) {
      this.name = name;
      this.duration = duration;
      this.tags = tags;
    }
  
    display_item() {
      let properties = $('<ul>');
      properties.append(this.display_duration());
      properties.append(this.display_tags());
      return $('<li>')
             .addClass('task')
             .append(this.display_name())
             .append(properties);
    }
    
    display_name() {
      return $('<span>')
             .addClass('name')
             .text(this.name);
    }
    
    display_duration() {
      let d = Math.trunc(this.duration / 60);
      d += "h " +(this.duration % 60) + "min";
      let item = $('<li>').addClass('duration').text(d);
      if (this.duration <= 30) {
        item.addClass('vShort');
      } else if (this.duration >30 && this.duration <= 240) {
        item.addClass('short');
      } else if (this.duration >240 && this.duration <= 720) {
          item.addClass('medium');
      } else if (this.duration > 720) {
          item.addClass('long');
      }
      return item;
    }
    
    display_tags() {
      let container = $('<li>').addClass('tags').text(this.tags);
      let field = $('<input>').prop('type', 'text');
      let button = $('<input>').prop('type', 'submit');
      let editor = $('<form>').append(field).append(button);
      
      let task = this;
      
      let in_edit = false;
      
      container.click((event) => {
        event.stopPropagation();
        event.preventDefault();
        
        let target = $(event.target);
        
        if (target.is('li') && !in_edit) {
          container.empty();
          container.append(editor);
          in_edit = true;
        }
        
        if (target.is('input') && target.prop('type') === 'submit') {
          task.tags = field.val();
          container.empty();
          container.text(task.tags);
          in_edit = false;
        }
        
      });
      
      return container;
    }

  }
  
  module.tasks = [];
  
  module.display_tasks = (div_id) => {
    let container = $('<ul>').prop('id', 'tasks');
    $(div_id).append(container);
    
    for (let task of module.tasks) {
      $(container).append(task.display_item());
    }
  }

    module.addTask=function addTask(nomTask, dureeTaskH, dureeTaskM){
        if(nomTask==="") nomTask="Tache "+(module.tasks.length+1);
        let d = Number(dureeTaskH*60) + Number(dureeTaskM);
        if((dureeTaskH==0) && (dureeTaskM==0)) d = "Sans Durée";
        module.tasks.push(new module.Task(nomTask, d, 'Sans Tag'));
        let container = $('<ul>').prop('id', 'tasks');
        $('#taskmanager').append(container);
        let task = module.tasks[module.tasks.length-1]
        $(container).append(task.display_item());
        $('#menuAjoutTask').remove();
        $('#btnValidateTask').remove();
    }
  
  return module;
})();



$(() => {
  /**
  TaskManager.tasks.push(new TaskManager.Task('tache 1', 10, 'test1'));
  TaskManager.tasks.push(new TaskManager.Task('tache 2', 20, 'test2'));
  TaskManager.tasks.push(new TaskManager.Task('tache 3', 15, 'test1'));
   TaskManager.display_tasks('#taskmanager');
   */

  $(document).on("click","#btnAddTask", function(){
      if(!document.getElementById('menuAjoutTask')) {
          $("#btnAddTask").after("<div id = 'menuAjoutTask'><span class='inputsTask'> <p class = 'nomInput'>Tache : </p> <input id='inputNameTask' type='text'> </span>");
          $("#inputNameTask").after("<span class='inputsTask'> <p class = 'nomInput'>Duree : </p> <select id='selectH'></select> h <select id='selectM'></select> min </span>");

          $(function(){
              for (let i=0;i<=23;i++){
                  $('#selectH').append($('<option></option>').val(i).html(i))
              }
              for (let i=0;i<=59;i++){
                  $('#selectM').append($('<option></option>').val(i).html(i))
              }
          });

          $("#menuAjoutTask").after("<button id='btnValidateTask' type='text' onclick='TaskManager.addTask(document.getElementById(\"inputNameTask\").value,document.getElementById(\"selectH\").value,document.getElementById(\"selectM\").value)'>Validate</button></div>");
      }
  })

});