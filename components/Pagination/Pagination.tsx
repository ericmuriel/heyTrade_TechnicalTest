import React from 'react';
import { PageButton, PageButtonText, PaginationContainer } from './PaginationStyled';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageButtons = () => {
    const pageButtons = [];

    // Mostrar la primera página siempre
    pageButtons.push(
      <PageButton key={1} onPress={() => onPageChange(1)} disabled={1 === currentPage}>
        <PageButtonText style={{ color: 1 === currentPage ? 'blue' : 'black' }}>1</PageButtonText>
      </PageButton>
    );

    // Verificar si hay páginas entre la primera y la página actual
    if (currentPage > 4) {
      pageButtons.push(<PageButtonText key="dots-start">...</PageButtonText>);
    }

    // Mostrar las páginas cercanas a la actual
    const startPage = Math.max(2, currentPage - 2); // Comenzar desde 2 o 2 menos que la actual
    const endPage = Math.min(totalPages - 1, currentPage + 2); // Terminar en la última página menos 1

    for (let i = startPage; i <= endPage; i++) {
      if (i !== totalPages) { // No mostrar la última página aquí
        pageButtons.push(
          <PageButton key={i} onPress={() => onPageChange(i)} disabled={i === currentPage}>
            <PageButtonText style={{ color: i === currentPage ? 'blue' : 'black' }}>{i}</PageButtonText>
          </PageButton>
        );
      }
    }

    // Verificar si hay páginas entre la página actual y la última
    if (currentPage < totalPages - 3) {
      pageButtons.push(<PageButtonText key="dots-end">...</PageButtonText>);
    }

    // Mostrar la última página siempre
    if (totalPages > 1) {
      pageButtons.push(
        <PageButton key={totalPages} onPress={() => onPageChange(totalPages)} disabled={totalPages === currentPage}>
          <PageButtonText style={{ color: totalPages === currentPage ? 'blue' : 'black' }}>{totalPages}</PageButtonText>
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
