"use client"
import { Component } from 'react';
import style from './upload.module.scss';
import { uploadFile } from '../../utils/uploadHelper'
export default class Upload extends Component{
    uploadImage(e:any){
        let files = e.target.files;
        uploadFile(files[0]).subscribe({
            next: (result) => {
                console.log(result)
            },
            error: (err) => {
                console.log(err)
            },
            complete: (e) => {
                console.log(e)
            },
        });
    }
    render(){
        return (
            <div className="container flexColumnCenterAll">
                <div>
                    <label
                        className="flexColumnCenterAll"
                        htmlFor={style.fileInput}
                    >
                        <svg
                            className={style.icon}
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                        <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        </svg>
                        <input
                            id={style.fileInput}
                            name="cover"
                            type="file"
                            accept="image/png,image/jpeg,image/jpg"
                            onChange={this.uploadImage}
                        />
                    </label>
                </div>
                <p>png, jpeg, jpg</p>
                <p>up to 2MB</p>
            </div>
        )
    }
}