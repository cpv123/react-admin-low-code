import React, { useState, useEffect } from 'react';
import { Admin, Resource } from 'react-admin';
import buildHasuraProvider from 'ra-data-hasura';
import {
  TodosList,
  TodosCreate,
  TodosEdit,
  TodosIcon,
} from './resources/todos';
import { UsersList, UsersShow, UsersIcon } from './resources/users';
import customBuildFields from './custom-build-fields';

const GRAPHQL_URI = 'https://react-admin-low-code.hasura.app/v1/graphql';

const clientOptions = { uri: GRAPHQL_URI };

function App() {
  const [dataProvider, setDataProvider] = useState<null | Function>(null);

  useEffect(() => {
    const buildDataProvider = async () => {
      const dataProvider = await buildHasuraProvider(
        { clientOptions },
        { buildFields: customBuildFields }
      );
      setDataProvider(() => dataProvider);
    };
    buildDataProvider();
  }, []);

  if (!dataProvider) return <p>Loading...</p>;
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="todos"
        icon={TodosIcon}
        list={TodosList}
        create={TodosCreate}
        edit={TodosEdit}
      />
      <Resource
        name="users"
        icon={UsersIcon}
        list={UsersList}
        show={UsersShow}
      />
    </Admin>
  );
}

export default App;
