const { h, app } = hyperapp

const haiku_state = {
  text: 'vert',
}

const haiku_actions = {
  vert: value => haiku_state => ({ text: value})
}

let length = value => value==undefined?0:String(value).length
let charAt = (value, index) =>value==undefined?'　':length(value)<=index?'　':String(value).charAt(index)
function convert(value){
  var lines = value.split('\n')
  var max = Math.max(length(lines[0]), length(lines[1]), length(lines[2]))
  var result = ""
  for(var i=0; i<max; i++){
      result += charAt(lines[2],i) +charAt(lines[1],i) + charAt(lines[0],i) + '\n' 
  }
  // console.log(lines[0])
  return result
}

const haiku_view = (state, actions) =>
  h("div", {}, [
    h("textarea", { id: "area", rows: 5, placeholder: "ここに俳句を入力", onkeyup: ev => actions.vert(convert(ev.target.value)) }, ""),
    h("hr"),
    h("textarea", { "id": "result", "class":"haiku", "rows":10}, state.text),
  ])

let haiku = () => window.main = app(haiku_state, haiku_actions, haiku_view, byId("contents"))