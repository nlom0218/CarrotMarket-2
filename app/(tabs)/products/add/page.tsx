'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { ChangeEvent, useState } from 'react';
import { uploadProduct } from './actions';

export default function AddProduct() {
  const [preview, setPreview] = useState('');
  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const file = files[0];
    const url = URL.createObjectURL(file);

    setPreview(url);
  };

  return (
    <div>
      <form className="flex flex-col gap-5 p-5" action={uploadProduct}>
        <label
          htmlFor="photo"
          className="border-2 border-neutral-300 aspect-square flex items-center justify-center flex-col text-neutral-400 rounded-md border-dashed cursor-pointer
            bg-center bg-cover
          "
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          {preview === '' ? (
            <>
              <PhotoIcon className="w-20" />
              <div>사진을 추가해주세요.</div>{' '}
            </>
          ) : null}
        </label>
        <input
          onChange={onImageChange}
          name="photo"
          id="photo"
          type="file"
          className="hidden"
        />
        <Input name="title" required placeholder="제목" type="text" />
        <Input name="number" required placeholder="가격" type="number" />
        <Input
          name="description"
          required
          placeholder="자세한 설명"
          type="text"
        />
        <Button type="submit">작성 완료</Button>
      </form>
    </div>
  );
}
