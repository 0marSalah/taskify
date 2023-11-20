import fetcher from './fetcher';

export default async function fetchProjects() {
  try {
    const res = await fetcher('/api/projects', 'GET', {});
    return res;
  } catch (err) {
    console.log(err);
  }
}

export const fetchProject = async (id: string) => {
  try {
    const res = await fetcher(`/api/projects/${id}`, 'GET', {});
    return res;
  } catch (err) {
    console.log(err);
  }
};
