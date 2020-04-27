def get_str_with_mask(tail_to_convert: str = '', mask_symbol: str = '*', n_unmaskchar: int = 4) -> str:
    tail = tail_to_convert[-n_unmaskchar:]

    head = ''
    for c in range(0, len(tail_to_convert) - n_unmaskchar):
        head += mask_symbol

    return head + tail
