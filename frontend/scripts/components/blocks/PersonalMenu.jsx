import React from 'react'
import Nav from '../helpers/Nav'
import Collapse, { Panel } from 'rc-collapse'


const PersonalMenu = () => (
    <div className="personalMenu card">
        <div className="card-header text-muted personalMenu__header">Личный кабинет</div>
        <div className="card-block">
            <Collapse>
                <Panel header="Устройства">
                    <Nav links={[{href: 'devices', text: 'Инструменты'}]}/>
                </Panel>
                <Panel header="Заказы">
                    <Nav links={[
                        {href: '', text: 'Заказчик'},
                        {href: '', text: 'Исполнитель'},
                        {href: '', text: 'Сообщения'},
                        {href: '', text: 'Дать задание'}
                        ]}/>
                </Panel>
                <Panel header="Электронное обращение">
                    <Nav links={[{href: '', text: 'По России'}]}/>
                </Panel>
                <Panel header="Биржа задач">
                    <Nav links={[{href: '', text: 'Поиск'}]}/>
                </Panel>
            </Collapse>
        </div>
    </div>
);


export default PersonalMenu
