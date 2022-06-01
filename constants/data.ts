const initialState = {
  registryTime: '',
  title: '',
  description: '',
  estimatedTime: '',
  priority: '',
};

const selectOptions = ['p1', 'p2', 'p3', 'p4'];

const taskListColumns = [
  {
    Header: 'Task Id',
    accessor: 'id',
  },
  {
    Header: 'Title',
    accessor: 'title',
  },

  {
    Header: 'Estimated Time',
    accessor: 'estimatedTime',
  },
  {
    Header: 'Priority',
    accessor: 'priority',
  },
];

export default { initialState, selectOptions, taskListColumns };
