import React from 'react';
import ApolloWrapper from 'src/components/ApolloWrapper/ApolloWrapper';

import Posts from '../posts/Posts';

function App() {
  return (
    <ApolloWrapper>
      <div className="container">
        <Posts />
      </div>
    </ApolloWrapper>
  );
}

export default App;
