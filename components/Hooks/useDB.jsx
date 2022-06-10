import { useEffect, useState } from 'react'
import axios from 'axios';

const useDB = () => {
    const [connected, setConnected] = useState(null);

    const connect = () => {
        axios.post('/api/connect').then(res => {
        console.log(res)
        setConnected(true);
        })
    }
  const disconnect = () => {
    axios.post('/api/disconnect', {
    }).then( (res) => {
      console.log(res);
    }).catch( (err) => console.log(err))
  }

    useEffect(() => {
        connect();
        return () => {
            setConnected(false);
        }
    }, [])


    return { connected };
}

export default useDB