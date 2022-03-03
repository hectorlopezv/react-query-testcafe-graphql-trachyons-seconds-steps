import { useMutation, useQuery, useQueryClient } from "react-query";
import { request, gql } from "graphql-request";
import { Fragment, useEffect, useState } from "react";
const endpoint = "http://localhost:4000/graphql";

const fetchDesserts = () => {
  return request(
    endpoint,
    gql`
      query {
        desserts {
          id
          data {
            calories
            carbs
            fat
            name
            protein
          }
        }
      }
    `
  );
};

const deleteDessert = (dessertId) => {

  const toDeleteDeserts = dessertId
    ?.filter((dessert) => dessert.state === true)
    .map((el) => el.id);

  return request(
    endpoint,
    gql`
      mutation DeleteDessert($dessertId: [String]) {
        deleteDessert(dessertId: $dessertId) {
          name
          brah
          bro
          calories
          fat
          name
          protein
        }
      }
    `,
    { dessertId: toDeleteDeserts }
  );
};
const sortFn = (a, b) => {};
const Table = () => {
  const queryClient = useQueryClient();
  const { data, isFetched } = useQuery("desserts", fetchDesserts, {
    select: (data) => {
      data?.desserts.sort((a, b) => {
        if (a.data.name < b.data.name) {
          return -1;
        }
        if (a.data.name > b.data.name) {
          return 1;
        }
        return 0;
      });
      return data;
    },
  });

  const { mutate, isLoading, isError, error, isSuccess, mutateAsync, reset } =
    useMutation("delete-deserts", deleteDessert, {
      retry: 3,
      onSuccess: () => {
        queryClient.invalidateQueries("desserts");
        setCheckedState(null);
        setTotal(0);
      },
    });

  const [total, setTotal] = useState(0);

  const [checkedState, setCheckedState] = useState(null);
  useEffect(() => {
    if (checkedState === null && isFetched) {
      const initialCheckedState = data?.desserts?.map((el) => {
        return { state: false, id: el.id };
      });
   
      setCheckedState(initialCheckedState);
    }
  }, [checkedState, data, data?.desserts, isFetched]);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) => {


      return {
        state: item.id === position ? !item.state : item.state,
        id: item.id,
      };
    });


    setCheckedState([...updatedCheckedState]);
    const total = updatedCheckedState.reduce((previous, current) => {
      return current.state ? previous + 1 : previous;
    }, 0);

    setTotal(total);
  };

  const handleDeleteDessert = () => {
    mutate(checkedState);
  };


  return (
    <div className="pa4 avenir">
      <div className="overflow-auto">
        {total > 0 && (
          <div className="flex items-center bg-washed-red pt4 pb4  pl3 pr3 f5 w-100 center">
            <p className="ma0 mr-auto red">{total} selected</p>
            <svg
              onClick={handleDeleteDessert}
              className="mid-gray pointer"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path>
            </svg>
          </div>
        )}

        <table className="f6 w-100 mw8 center" cellSpacing="0">
          <thead className="">
            <tr className="">
              <th className="fw5 bb b--black-20 tl pb3 pt3  pr3  pl1 bg-white">
                Desert (100 g serving)
              </th>
              <th className="fw5 bb b--black-20 tr pb3 pr3  pt3  bg-white">
                Calories
              </th>
              <th className="fw5 bb b--black-20 tr pb3 pr3 pt3  bg-white">
                Fat (g)
              </th>
              <th className="fw5 bb b--black-20 tr pb3 pr3  pt3  bg-white">
                Carbs (g)
              </th>
              <th className="fw5 bb b--black-20 tr pb3 pt3  pr3 bg-white">
                Protein (g)
              </th>
            </tr>
          </thead>
          <tbody className="lh-copy">
            {!!checkedState !== null &&
              data?.desserts?.map((dessert) => {
        

                return (
                  <Fragment key={`dessert_${dessert.id}`}>
                    <tr>
                      <td className="pv3 pr3 bb b--black-20  pl1 ">
                        <div className="mb2 ">
                          <label
                            htmlFor="Oreo"
                            className="lh-copy flex items-center"
                          >
                            <input
                              className="mr2"
                              type="checkbox"
                              // id={`custom-checkbox-${dessert.id}`}
                              name={dessert?.data?.name}
                              value={dessert?.data?.name}
                              //checked={checkedState[dessert.id]?.state}
                              onChange={() => handleOnChange(dessert.id)}
                            />
                            {dessert?.data?.name}
                          </label>
                        </div>
                      </td>
                      <td className="pv3 pr3 bb b--black-20 tr">
                        {dessert?.data?.calories}
                      </td>
                      <td className="pv3 pr3 bb b--black-20 tr">
                        {dessert?.data?.fat}
                      </td>
                      <td className="pv3 pr3 bb b--black-20 tr">
                        {dessert?.data?.carbs}
                      </td>
                      <td className="pv3 pr3 bb b--black-20 tr">
                        {dessert?.data?.protein}
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Table;
