import Todo from './Models'

var todoArr = []
var addTodo = function ({ title, description }) {
    var todoObj = {
        id: todoArr.length,
        title,
        description
    }
    new Todo(todoObj).save();
    todoArr.push(todoObj)
    return todoArr
}

var deleteTodo = function (args) {
    todoArr.splice(args.id, 1)
    return todoArr
}

var updateTodo = function (args) {
    console.log(args)
    todoArr.map((val, ind) => {
        if (args.id === ind) {

            if (args.title && args.description) {
                val.title = args.title
                val.description = args.description
            }
            else if (args.description)
                return val.description = args.description

            else if (args.title)
                val.title = args.title

            else
                return val
        }
    })
    return todoArr
}


var getTodos = function () {
    // Todo.find
    return todoArr;
}


export const root = {
    createTodo: addTodo,
    todos: getTodos,
    deleteTodo: deleteTodo,
    updateTodo: updateTodo
};