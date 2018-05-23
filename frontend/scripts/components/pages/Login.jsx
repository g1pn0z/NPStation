import React, { Component } from 'react'
import ProfileActions from '../../actions/ProfileActions'


export default class LoginForm extends Component {

    state = {
        username: '',
        password: ''
    };

    get is_valid_username() {
        return this.state.username.trim().length > 0;
    }

    get is_valid_password() {
        return this.state.password.trim().length > 0;
    }

    _handlerSubmit(e){
        e.preventDefault();
        ProfileActions.fetchProfile(this.state.username, this.state.password);
    }

    render(){
        return (
            <div className="formLogin page__content_block">
                <div className="row">
                    <div className="col-xs-12 col-lg-6">
                        <h3>Добро пожаловать на "Станцию Без Паранойи"</h3>
                        <p>Разработка и исследования алгоритмов мониторинга и поиска мобильных устройств</p>
                        <button className="btn btn-primary formLogin_button_reg">Получить инвайт</button>
                        <br />
                        <h6>Количество подключенных устройств: 4938532 штук</h6>
                        <p>Индекс развития цивиллизации(Ip=(Общее число различных задач/максимальную стоимость задачи)): 0.001 %</p>
                    </div>
                    <div className="hidden-md-down col-lg-2">
                    </div>
                    <div className="col-xs-12 col-lg-4">
                        <form className="formLogin__form" onSubmit={this._handlerSubmit.bind(this)} method="post">
                            {
                                this.props.errorMessage ?
                                    <div className="alert alert-danger">{this.props.errorMessage}</div>
                                    : false
                            }
                            <div className="form-group">
                                <label>Логин</label>
                                <input
                                    className="form-control"
                                    value={this.state.username}
                                    onChange={e => this.setState({username: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Пароль</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={this.state.password}
                                    onChange={e => this.setState({password: e.target.value})}
                                />
                            </div>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input" />
                                    Запомнить меня
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="btn"
                                disabled={!this.is_valid_username || !this.is_valid_password}
                            >Войти</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
