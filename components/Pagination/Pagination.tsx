import React, { useContext } from 'react';
import { PageButton, PageButtonText, PaginationContainer } from './PaginationStyled';
import { GenericContext } from '@/context/GenericContext';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, onPageChange }) => {
  const { currentPage } = useContext(GenericContext);

  const renderPageButtons = () => {
    const pageButtons = [];

    pageButtons.push(
      <PageButton key={1} onPress={() => onPageChange(1)} disabled={currentPage === 1}>
        <PageButtonText style={{ color: currentPage === 1 ? 'blue' : 'black' }}>1</PageButtonText>
      </PageButton>
    );

    // Verificar si hay que mostrar "..." antes de las páginas cercanas a la actual
    if (currentPage > 4) {
      pageButtons.push(<PageButtonText key="dots-start">...</PageButtonText>);
    }

    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <PageButton key={i} onPress={() => onPageChange(i)} disabled={currentPage === i}>
          <PageButtonText style={{ color: currentPage === i ? 'blue' : 'black' }}>{i}</PageButtonText>
        </PageButton>
      );
    }

    // Verificar si hay que mostrar "..." páginas cercanas a la actual
    if (currentPage < totalPages - 3) {
      pageButtons.push(<PageButtonText key="dots-end">...</PageButtonText>);
    }

    // Mostrar siempre la última página
    if (totalPages > 1) {
      pageButtons.push(
        <PageButton key={totalPages} onPress={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
          <PageButtonText style={{ color: currentPage === totalPages ? 'blue' : 'black' }}>{totalPages}</PageButtonText>
        </PageButton>
      );
    }

    return pageButtons;
  };

  return (
    <PaginationContainer style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
      {renderPageButtons()}
    </PaginationContainer>
  );
};

export default Pagination;
