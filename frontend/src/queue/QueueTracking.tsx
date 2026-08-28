import {useState} from 'react';
import api from '../lib/axios';
import SideBar from './components/SideBar';
import { useSearchParams } from 'react-router';

function QueueTracking() {
    const [sex, setSex] = useState('');
    const [age, setAge] = useState('');
    const [reason, setReason] = useState('');
    const [open, setOpen] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page") ?? "dashboard";
    function setPage(newPage: string) {
        setSearchParams({ page: newPage });
    }
    return (

        <div className="flex min-h-screen">
        <SideBar open={open} page={page} setPage={setPage} />
    <form>

    <select value={sex} onChange={(e) => setSex(e.target.value)}>
             <option value="male">Male</option>
            <option value="female">Female</option>
             <option value="other">Other</option>
         </select>
         <input type="text" placeholder="Enter your contact number" />
         <input type="text" placeholder="Enter your contact number" />
         <input type="text" placeholder="Enter your contact number" />
         <button type="submit">Join Queue</button>

    </form>
           
        </div>
    //     <div>
    // <form>

    //     <select value={sex} onChange={(e) => setSex(e.target.value)}>
    //         <option value="male">Male</option>
    //         <option value="female">Female</option>
    //         <option value="other">Other</option>
    //     </select>
    //     <input type="text" placeholder="Enter your contact number" />
    //     <input type="text" placeholder="Enter your contact number" />
    //     <input type="text" placeholder="Enter your contact number" />
    //     <button type="submit">Join Queue</button>

    // </form>
    //     </div>
    );
}
export default QueueTracking;