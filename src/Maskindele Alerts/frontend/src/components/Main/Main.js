import React, {useState} from 'react';
import keygen from 'keygenerator';
import axios from 'axios'

export const Main = () => {

    const [key, setKey] = useState('');

    const [message, setMessage] = useState('');

    const generateKeyHandler = async () => {

        try {
            const keyHash = keygen.session_id();
            setKey(keyHash);

            await axios.post('/api/user/addVkToken', {vkToken: keyHash, email: localStorage.userEmail})
        } catch (e) {
            console.log(e)
        }
    };

    const sendMessageHandler = async () => {
      try {
          await axios.post('/api/user/pushMessage', {message, userId: localStorage.userId});

          setMessage('');
      }  catch (e) {
          console.log(e)
      }
    };

    return (
        <div className={'Main'}>

            <div className="header-content">
                <h1>Привязка аккаунта VK к сервису</h1>
                <p>Скопируйте ваш ключ и отправьте его нашему боту в вк для подлючения уведомлений</p>
            </div>

            <div className="Main__container">
                <div className="Main__info">
                    <div className="formInput">
                        <p>Ваш ключ</p>
                        <input type="text" value={key} onChange={e => setKey(e.target.value)}/>
                    </div>
                    {key === '' ?
                        <button onClick={generateKeyHandler}>Сгенерировать ключ</button> :
                        <button>Скопировать ключ</button>
                    }
                    <button>Перейти в ВК</button>
                </div>

                <div className="Main__info">
                    <div className="formInput">
                        <p>Сообщение</p>
                        <input type="text" placeholder={'Ввести сообщение'} value={message} onChange={e => setMessage(e.target.value)}/>
                    </div>
                    <button onClick={sendMessageHandler}>Send message</button>
                </div>
            </div>
        </div>
    )
};