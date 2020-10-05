class Declare{
  
  constructor(execution = () => {}){
    this.handlers = () => {};
    this.state = 'pending';
    this.value = null;
    execution(this.resolve.bind(this));  
  }

  resolve(value) {
    if (this.state === 'pending') {
        this.value = value;
        this.state = 'resolved';
        this.handlers(value);
    }
  }

  then(execution = () => {}){
    this.handlers = execution
    if (this.state === 'resolved') {
      return new Declare((resolveExecution) => {
        resolveExecution(execution(this.value))
      })
    } else {
      return this
    }
  }
}

module.exports = Declare