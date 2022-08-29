import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const TableDisplay = ({ expense }) => {
  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th isNumeric>Paid_Amount</Th>
            <Th isNumeric>Split_Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{expense.createdBy}</Td>
            <Td isNumeric>{expense.paidByMe}</Td>
            <Td isNumeric>{expense.splitByMe}</Td>
          </Tr>
          {expense.users.map((user, index) => (
            <Tr key={index}>
              <Td>{user.email}</Td>
              <Td isNumeric>{user.paidAmount}</Td>
              <Td isNumeric>{user.splitAmount}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableDisplay;
