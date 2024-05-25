$(function () {
  $('#permissions').DataTable({
    ajax: {
      url: 'https://reports.jenkins.io/github-jenkinsci-permissions-report.json',
      dataSrc: '',
    },
    columns: [
      {
        title: 'Repository',
        render: function (data, type, row, metadata) {
          return (
            '<a href="https://github.com/jenkinsci/' +
            data +
            '" target="_blank" rel="noreferrer noopener">' +
            data +
            '</a>'
          );
        },
      },
      {
        title: 'User',
        render: function (data, type, row, metadata) {
          return (
            '<a href="https://github.com/' +
            data +
            '" target="_blank" rel="noreferrer noopener">' +
            data +
            '</a>'
          );
        },
      },
      {
        title: 'Access',
      },
    ],
  });
});
