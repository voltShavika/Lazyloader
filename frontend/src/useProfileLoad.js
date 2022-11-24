import {useEffect, useState} from 'react'
import axios from 'axios';

export default function useProfileLoad(pageNumber) {

    const [loading, setLoading] = useState(true);
    const [profiles, setProfiles] = useState([]);
    const [hasMore, setHasMore] = useState(false);


    useEffect(() => {
        setLoading(true);
        axios({
            method: 'GET',
            url: "https://mockend.com/voltShavika/Lazyloader/comments",
            params: {offset: pageNumber*8, limit: 8}
        }).then(res => {
            console.log("Fetched Profiles " + res.data.length);
            setProfiles(prevProfiles => {
                return [...prevProfiles, ...res.data]
            });
            setLoading(false);
            setHasMore(res.data.length > 0);
        }).catch(e => {
            console.log("Error is Axios");
        })
    }, [pageNumber]);
  return {loading, profiles, hasMore};
}
