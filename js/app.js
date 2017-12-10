window.TaskManager = (() => {
  let module = {};
  
  module.Tag = class Tag{
    constructor(label=""){
      this.label=label;
    }
  }



  module.Task = class Task {
    constructor(name = 'untitled', duration = 0, tags = null) {
      this.name = name;
      this.duration = duration;
      this.tags = [tags];
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
      let item = $('<li>').addClass('duration').text(this.duration);
      if (this.duration <= 10) {
        item.addClass('short');
      } else if (this.duration >= 20) {
        item.addClass('long');
      }
      return item;
    }
    
    display_tags() {
      let container = $('<li>').addClass('tags').text(this.tags);
      let field = $('<input>').prop('type', 'text');
      let button = $('<input>').prop('type', 'submit');
      let editor = $('<form>').append(field).append(button);
      let add = $('<button class="addTag">Ajouter un tag</button>');

      let task = this;
      
      let in_edit = false;
      
      container.click((event) => {
        //event.stopPropagation();
        event.preventDefault();
        
        let target = $(event.target);
        
        if (target.is('li') && !in_edit) {
          container.empty();
          for(var i=0; i<task.tags.length; i++){
            container.append(task.tags[i]);
            container.append($('<button class="delTag" id="'+i+'">-</button>'));
            container.append("</br>");  
          }
          container.prepend("<br>");
          container.prepend(add);
          in_edit = true;
        }
        
        if (target.is('input') && target.prop('type') === 'submit') {
          task.tags.push(field.val());
          field.empty();
          container.empty();
          
          for(var i=0; i<task.tags.length; i++){
            container.append(task.tags[i]);
            container.append("</br>");  
          }
          in_edit = false;
        }
        if(target.is(".addTag")){
          container.append(editor);

        }

        if(target.is(".delTag")){
          task.tags.splice(target[0].id,1);
          container.empty();
          if(task.tags.length==0){
            container.prepend(add);
          }
          for(var i=0; i<task.tags.length; i++){
            container.append(task.tags[i]);
            container.append("</br>");  
          }
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
  
  return module;
})();


$(() => {
  TaskManager.tasks.push(new TaskManager.Task('tache 1', 10, 'test1'));
  TaskManager.tasks.push(new TaskManager.Task('tache 2', 20, 'test2'));
  TaskManager.tasks.push(new TaskManager.Task('tache 3', 15, 'test1'));

  TaskManager.display_tasks('#taskmanager');
});

$(document).on("click","#btnAddTask", function(){
    $("#btnAddTask").after("<input id=\"inputNameTask\" type=\"text\">");
    $("#inputNameTask").after("<input id=\"inputDurationTask\" type=\"text\">");
    $("#inputDurationTask").after("<button id=\"inputDurationTask\" type=\"text\">Validate</button>");
})