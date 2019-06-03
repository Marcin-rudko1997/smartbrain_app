import React from 'react';
import './Profile.css';

export default class Profile extends React.Component {

    state = {
        name: this.props.user.name,
        age: this.props.user.age,
        pet: this.props.user.pet
    }

    onFormChange = e => {
        switch(e.target.name) {
            case "user-name":
                this.setState({name: e.target.value});
                break;
            case "user-age":
                this.setState({age: e.target.value});
                break;
            case "user-pet":
                this.setState({pet: e.target.value});
                break;
            default: 
                return;
            
        }
    }

    onProfileUpdate = data => {
        fetch(`http://192.168.99.100:3001/profile/${this.props.user.id}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({formInput: data})
        })
        .then(response => {
            if(response.status === 200 || response.status === 304) {
                this.props.toggleModal();
                this.props.loadUser({...this.props.user, ...data})
            }
        }).catch(err => console.log(err));
    }

    render() {
        const {name, age, pet} = this.state;
        return (
            <div className="profile-modal">
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center bg-white">
                    <main className="pa4 black-80 w-80">
                        <img
                        src="http://tachyons.io/img/logo.jpg"
                        className="h3 w3 dib" alt="avatar" />
                        <h1>{this.state.name}</h1>
                        <h4>Images Submitted: {this.props.user.entries}</h4>
                        <p>{`Member since ${new Date(this.props.user.joined).toLocaleDateString()}`}</p>
                        <hr />
                        <label className="mt2 fw6" htmlFor="user-name">Name:</label>
                        <input
                            onChange={this.onFormChange} 
                            className="pa2 ba w-100"
                            placeholder="John" 
                            type="text" 
                            name="user-name"  
                            id="name"/>
                        <label className="mt2 fw6" htmlFor="user-age">Age:</label>
                        <input 
                            className="pa2 ba w-100"
                            placeholder="56" 
                            type="text" 
                            name="user-age"  
                            id="age"/>
                        <label className="mt2 fw6" htmlFor="user-pet">Pet:</label>
                        <input 
                            className="pa2 ba w-100" 
                            placeholder="goat"
                            type="text" 
                            name="user-pet"  
                            id="pet"/>
                        <div className="mt4" style={{display: 'flex', justifyContent: 'space-evenly'}}>
                            <button onClick={() => this.onProfileUpdate({name, age, pet})} className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20">
                                Save
                            </button>
                            <button  onClick={this.props.toggleModal} className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20">
                                Cancel
                            </button>
                        </div>
                    </main>
                    <div onClick={this.props.toggleModal} className="modal-close">&times;</div>
                </article>
            </div>
        );
    }
}

