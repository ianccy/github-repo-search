import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Layout from 'components/Layout';
import SearchRepo from 'components/Dashboard/SearchRepo';

import useSetTtitle from 'hooks/useSetTtitle';

import { getReposApi } from 'api/getRepos';

function Dashboard() {
    useSetTtitle({ title: 'GitHub Repos Search' });

    const [repoName, setRepoName] = useState('');
    const [searchSort, setSearchSort] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [repos, setRepos] = useState([]);
    const [counter, setCounter] = useState(0);

    function updateRepoName(value) {
        setRepoName(value);
    }

    async function getRepos({ name, searchSort }) {
        try {
            setIsLoading(true);
            const { httpStatus, payload: { incomplete_results, items, total_count } = {} } =
                await getReposApi({ name, searchSort });
            if (httpStatus === 200) {
                setRepos(items);
                setCounter(total_count);
            }
        } catch (error) {
            // error handle
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (Boolean(repoName)) {
            getRepos({ name: repoName, searchSort: searchSort });
        }
    }, [repoName, searchSort]);

    console.log(repoName);

    return (
        <Layout>
            <SearchRepo name={repoName} updateName={updateRepoName} />
        </Layout>
    );
}

Dashboard.propTypes = {
    props: PropTypes.func
};

export default Dashboard;